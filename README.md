# γ-分泌酶比较数据库

一个用于比较不同物种γ-分泌酶复合物亚基的综合性网络平台，提供详细的序列比对、结构分析和进化洞察。

## 🌟 主要功能

- **物种比较**: 比较人类与其他模式生物的γ-分泌酶亚基
- **序列比对**: 交互式序列比对查看器，高亮显示差异
- **3D结构可视化**: 集成的3D蛋白质结构查看器
- **进化分析**: 系统发育树和保守性分析
- **管理面板**: 数据库管理的内容管理系统
- **响应式设计**: 针对桌面和移动设备优化
- **深色主题**: 为科学数据可视化优化的专业深色主题

## 🛠 技术栈

### 前端
- **框架**: Next.js 15 with App Router
- **语言**: TypeScript 提供类型安全
- **样式**: Tailwind CSS + shadcn/ui 组件
- **图标**: Lucide React 现代图标库

### 后端
- **数据库**: Supabase (PostgreSQL) 具有实时功能
- **认证**: Supabase Auth (为未来的管理功能准备)
- **文件存储**: Supabase Storage 用于文档和图片
- **API**: 从数据库模式自动生成REST API

### 部署
- **平台**: Vercel 为Next.js提供最佳性能
- **域名**: 支持自定义域名
- **SSL**: 自动HTTPS加密
- **CDN**: 全球内容分发网络

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Git

### 开发环境安装

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-repo/gamma-secretase-db.git
   cd gamma-secretase-db/gamma-web
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   # 复制环境变量模板
   cp .env.local .env.local.example
   ```

   更新 `.env.local` 文件（可选，用于Supabase集成）:
   ```
   # NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   **注意**: 应用程序可以在没有Supabase的情况下运行，使用JSON文件作为数据源。

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000)

### 生产环境部署

#### 方式一：Vercel部署（推荐）

1. **准备代码**
   ```bash
   # 确保代码已提交到Git仓库
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel部署**
   ```bash
   # 安装Vercel CLI
   npm i -g vercel

   # 登录Vercel
   vercel login

   # 部署项目
   vercel --prod
   ```

3. **配置环境变量**
   在Vercel控制台中设置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (你的域名)

#### 方式二：Docker部署

1. **构建Docker镜像**
   ```bash
   # 创建Dockerfile
   cat > Dockerfile << EOF
   FROM node:18-alpine AS base

   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   EOF

   # 构建镜像
   docker build -t gamma-secretase-db .

   # 运行容器
   docker run -p 3000:3000 gamma-secretase-db
   ```

#### 方式三：传统服务器部署

1. **构建生产版本**
   ```bash
   npm run build
   ```

2. **启动生产服务器**
   ```bash
   npm start
   ```

3. **使用PM2管理进程**
   ```bash
   # 安装PM2
   npm install -g pm2

   # 启动应用
   pm2 start npm --name "gamma-db" -- start

   # 设置开机自启
   pm2 startup
   pm2 save
   ```

## 📁 项目结构

```
gamma-web/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── admin/             # 管理面板
│   │   ├── comparison/        # 物种比较页面
│   │   ├── evolution/         # 进化分析
│   │   ├── login/             # 用户认证
│   │   ├── species/           # 物种索引
│   │   └── subunits/          # 亚基详情页面
│   ├── components/            # 可复用React组件
│   │   ├── ui/               # shadcn/ui 组件
│   │   ├── Header.tsx        # 导航头部
│   │   ├── Footer.tsx        # 网站底部
│   │   ├── SequenceAlignmentViewer.tsx  # 序列比对查看器
│   │   └── ThreeDViewer.tsx  # 3D结构查看器
│   ├── lib/                  # 工具函数
│   │   ├── data.ts          # 数据获取函数
│   │   ├── supabase.ts      # Supabase客户端
│   │   └── utils.ts         # 通用工具
│   └── types/               # TypeScript类型定义
├── public/
│   ├── data/               # JSON数据文件
│   │   ├── species.json    # 物种信息
│   │   ├── proteins.json   # 蛋白质序列和数据
│   │   ├── alignments.json # 序列比对数据
│   │   └── news.json       # 新闻和更新
│   └── structures/         # 蛋白质结构文件 (.cif)
└── README.md
```

## 🧬 数据管理

### 基于文件的内容管理

应用程序支持基于文件的内容管理系统，便于数据更新：

1. **物种数据** (`public/data/species.json`)
   - 添加新物种，包含通用名、学名、分类和描述
   - 包含图片URL和元数据

2. **蛋白质数据** (`public/data/proteins.json`)
   - 包含蛋白质序列（基于真实UniProt数据）
   - 包含UniProt ID、描述和实验数据
   - 链接到结构文件

3. **比对数据** (`public/data/alignments.json`)
   - 存储序列比对结果
   - 包含相似性百分比、错配和间隙
   - 提供比较摘要

4. **结构文件** (`public/structures/`)
   - 存储CIF格式的蛋白质结构文件
   - 链接结构到蛋白质条目

### 数据库集成（可选）

对于生产环境，应用程序可以集成Supabase：

1. **设置Supabase项目**
   ```bash
   # 访问 https://supabase.com 创建新项目
   # 获取项目URL和API密钥
   ```

2. **创建数据库表**
   ```sql
   -- 物种表
   CREATE TABLE species (
     id TEXT PRIMARY KEY,
     common_name TEXT NOT NULL,
     scientific_name TEXT NOT NULL,
     category TEXT NOT NULL,
     image_url TEXT,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- 蛋白质表
   CREATE TABLE proteins (
     id TEXT PRIMARY KEY,
     species_id TEXT REFERENCES species(id),
     subunit TEXT NOT NULL,
     sequence TEXT NOT NULL,
     description TEXT,
     evolutionary_context TEXT,
     key_sites TEXT[],
     experimental_data TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- 比对表
   CREATE TABLE alignments (
     id TEXT PRIMARY KEY,
     human_protein_id TEXT REFERENCES proteins(id),
     comparison_protein_id TEXT REFERENCES proteins(id),
     similarity_percentage DECIMAL,
     mismatches INTEGER,
     gaps INTEGER,
     comparison_summary TEXT,
     alignment_data TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **配置认证**
   - 在Supabase控制台中设置认证
   - 配置管理员访问权限

4. **数据迁移**
   - 通过管理面板上传数据
   - 或使用SQL脚本批量导入

## 🔐 管理面板

访问管理面板 `/admin`，使用演示凭据：
- 用户名: `admin`
- 密码: `password`

功能特性：
- 物种管理
- 蛋白质数据上传
- 比对生成
- 用户管理
- 系统配置

## 🎨 自定义配置

### 配色方案

应用程序使用精心设计的深色主题：

- **主色**: 深海军蓝 (#0F172A)
- **次色**: 深蓝色 (#1E293B)
- **强调色**: 钢蓝色 (#334155)
- **高亮**: 浅蓝灰 (#64748B)
- **文本**: 近白色 (#F1F5F9)
- **青色强调**: 亮青色 (#06B6D4) 用于交互元素

### 字体

- **无衬线字体**: Inter 用于所有常规文本
- **等宽字体**: 系统等宽字体用于序列数据

## 🧪 开发指南

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行ESLint检查

### 添加新功能

1. **创建组件** 在 `src/components/` 目录
2. **添加页面** 在 `src/app/` 目录
3. **更新类型** 在 `src/types/` 目录
4. **添加数据函数** 在 `src/lib/data.ts` 文件

### 测试指南

1. **开发环境测试**
   ```bash
   npm run dev
   # 访问 http://localhost:3000 测试所有功能
   ```

2. **生产构建测试**
   ```bash
   npm run build
   npm start
   # 访问 http://localhost:3000 测试生产版本
   ```

3. **功能测试清单**
   - [ ] 主页加载正常
   - [ ] 所有导航链接工作
   - [ ] 物种索引页面搜索功能
   - [ ] 亚基详情页面显示
   - [ ] 对比分析页面功能
   - [ ] 进化分析页面显示
   - [ ] 管理面板登录和功能
   - [ ] 响应式设计在移动设备上工作

## 📊 数据来源

数据库包含来自以下来源的真实蛋白质序列：

- **UniProt**: 蛋白质序列和注释数据
  - 人类APH-1A (Q96BI3)
  - 人类Nicastrin (Q92542)
  - 人类PSEN1 (P49768)
  - 人类PEN-2 (Q9NZ42)
- **RCSB PDB**: 蛋白质结构数据
- **AlphaFold**: 预测的蛋白质结构
- **文献资料**: 实验数据和功能注释

## 🚀 性能优化

### 生产环境优化建议

1. **启用压缩**
   ```bash
   # 在nginx配置中启用gzip
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   ```

2. **CDN配置**
   ```bash
   # 使用Vercel自动CDN或配置CloudFlare
   # 静态资源自动缓存优化
   ```

3. **数据库优化**
   ```sql
   -- 为常用查询添加索引
   CREATE INDEX idx_proteins_species ON proteins(species_id);
   CREATE INDEX idx_alignments_human ON alignments(human_protein_id);
   ```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -m '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建 Pull Request

### 代码规范

- 使用TypeScript进行类型检查
- 遵循ESLint配置规则
- 组件使用函数式组件和Hooks
- 样式使用Tailwind CSS类名

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- **UniProt** 提供蛋白质序列数据
- **RCSB PDB** 提供结构数据
- **AlphaFold** 提供预测结构
- **Next.js** 和 **Vercel** 提供优秀的开发平台
- **Tailwind CSS** 和 **shadcn/ui** 提供美观的UI组件

## 📞 技术支持

如有问题或需要支持，请：
- 在GitHub上创建issue
- 联系开发团队
- 查看项目文档

## � 故障排除

### 常见问题

1. **端口占用错误**
   ```bash
   # 查找占用端口的进程
   netstat -ano | findstr :3000
   # 终止进程
   taskkill /PID <进程ID> /F
   ```

2. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **构建失败**
   ```bash
   # 检查TypeScript错误
   npm run type-check
   # 检查ESLint错误
   npm run lint
   ```

---

**为科学研究社区用心构建 ❤️**
