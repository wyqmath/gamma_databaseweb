# γ-分泌酶比较数据库

一个用于比较不同物种γ-分泌酶复合物亚基的综合性网络平台，提供详细的序列比对、结构分析和进化洞察。

## ✨ 核心功能

### 🧬 比较分析系统
- [x] **跨物种比较分析** - 以人类为参考标准的亚基比较分析
- [x] **序列相似度计算** - 基于BLOSUM62矩阵的序列identity和similarity分析
- [x] **结构相似度评估** - 集成US-align进行RMSD、TM-score等结构比较
- [x] **多序列比对** - 使用BioMSA库的高性能序列比对功能
- [x] **3D结构可视化** - 基于Molstar的交互式结构查看器

### 🔬 数据分析工具
- [x] **保守性分析** - 识别功能重要的保守区域和关键位点
- [x] **进化关系展示** - 系统发育树和进化距离可视化
- [x] **统计指标计算** - 序列组成、分子量、疏水性等生物化学参数
- [x] **数据导出功能** - 支持比较结果和序列数据的批量下载

## 🛠 技术栈

### 前端
- **框架**: Next.js 15 with App Router
- **语言**: TypeScript 提供类型安全
- **样式**: Tailwind CSS + shadcn/ui 组件
- **图标**: Lucide React 现代图标库
- **序列分析**: BioMSA 高性能多序列比对
- **结构可视化**: Molstar 3D分子查看器

### 后端 & 数据处理
- **API**: Next.js API Routes
- **结构比较**: US-align 结构比对工具
- **数据存储**: JSON 文件存储在 public/data/ 目录
- **文件格式**: CIF格式的3D结构文件

## 📁 项目结构

```
gamma-web/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── admin/             # 管理面板
│   │   ├── api/               # API路由
│   │   │   └── structural-comparison/  # 结构比较API
│   │   ├── msa/              # 多序列比对页面
│   │   ├── evolution/         # 进化分析
│   │   ├── login/             # 用户认证
│   │   ├── species/           # 物种索引和详情
│   │   │   └── [speciesId]/   # 动态物种页面
│   │   │       └── [subunit]/ # 物种-亚基详情页面
│   │   └── subunits/          # 亚基详情页面
│   │       └── [subunit]/     # 动态亚基页面
│   │           └── compare/   # 🆕 比较分析页面
│   ├── components/            # 可复用React组件
│   │   ├── ui/               # shadcn/ui 基础组件
│   │   │   ├── badge.tsx     # 🆕 徽章组件
│   │   │   ├── progress.tsx  # 🆕 进度条组件
│   │   │   └── ...           # 其他UI组件
│   │   ├── Header.tsx        # 导航头部
│   │   ├── Footer.tsx        # 网站底部
│   │   ├── Breadcrumb.tsx    # 面包屑导航
│   │   ├── MultipleSequenceAlignmentViewer.tsx  # 多序列比对查看器
│   │   ├── SubunitComparisonViewer.tsx  # 🆕 亚基比较分析组件
│   │   ├── ThreeDViewer.tsx  # 3D结构查看器
│   │   ├── MolstarViewer.tsx # Molstar集成组件
│   │   └── SimpleSequenceViewer.tsx  # 简单序列查看器
│   ├── lib/                  # 工具函数库
│   │   ├── data.ts          # 数据获取函数
│   │   ├── similarity.ts    # 🆕 序列相似度计算
│   │   ├── structural-comparison.ts  # 🆕 结构比较工具
│   │   └── utils.ts         # 通用工具函数
│   └── types/               # TypeScript类型定义
│       └── index.ts         # 🆕 扩展了比较分析相关类型
├── public/
│   ├── data/               # JSON数据文件
│   │   ├── species.json    # 物种信息
│   │   ├── proteins.json   # 蛋白质序列和数据
│   │   ├── gamma_secretase.json  # 主要数据文件
│   │   ├── structural_comparisons.json  # 🆕 预计算的结构比较数据
│   │   ├── interactions.json  # 亚基相互作用数据
│   │   ├── complex_assembly.json  # 复合物组装数据
│   │   └── news.json       # 新闻和更新
│   └── structures/         # 蛋白质结构文件 (.cif)
├── scripts/                # 🆕 数据处理脚本
│   ├── generate-data.js    # 数据生成脚本
│   └── precompute-structural-data.js  # 🆕 结构数据预计算
└── README.md
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn 或 pnpm
- (可选) US-align 工具用于结构比较

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm run start
```

## 🧬 比较分析功能使用指南

### 访问比较分析
1. 进入任意亚基页面（如 `/subunits/psen1`）
2. 点击 **"比较分析"** 按钮
3. 或直接访问 `/subunits/psen1/compare`

### 功能特性
- **序列相似度分析**: 显示与人类参考序列的identity百分比
- **结构相似度评估**: 展示RMSD值和TM-score
- **保守性等级**: 自动评估保守程度（Very High/High/Moderate/Low）
- **交互式查看**:
  - 点击 "Show Alignment" 查看多序列比对
  - 点击 "Show Structures" 进行3D结构对比
  - 点击 "Download Data" 下载比较数据

### 支持的比较指标
- **序列指标**: Identity, Similarity, Gaps, BLOSUM62 Score
- **结构指标**: RMSD, TM-score, GDT-TS, GDT-HA
- **统计信息**: 比对长度, 链长度, 比对残基数

## 🔧 US-align 集成配置

### 安装 US-align (可选)
```bash
# 下载并编译 US-align
wget https://zhanggroup.org/US-align/bin/module/USalign.cpp
g++ -static -O3 -ffast-math -lm -o USalign USalign.cpp

# 将可执行文件移动到系统PATH
sudo mv USalign /usr/local/bin/
```

### Docker 部署 (推荐)
```dockerfile
FROM node:18-alpine

# 安装编译工具和US-align
RUN apk add --no-cache g++ wget
RUN wget https://zhanggroup.org/US-align/bin/module/USalign.cpp && \
    g++ -static -O3 -ffast-math -lm -o /usr/local/bin/USalign USalign.cpp && \
    rm USalign.cpp

# 复制应用代码
COPY . /app
WORKDIR /app

# 安装依赖并构建
RUN npm install && npm run build

CMD ["npm", "start"]
```

### 预计算结构数据
```bash
# 运行预计算脚本生成结构比较数据
node scripts/precompute-structural-data.js
```

## 📊 数据格式说明

### 主要数据文件
- **gamma_secretase.json**: 包含所有亚基的序列和结构信息
- **structural_comparisons.json**: 预计算的结构比较结果
- **species.json**: 物种分类和基本信息
- **proteins.json**: 蛋白质详细信息

### 结构比较数据格式
```json
{
  "PSEN1": {
    "mouse": {
      "rmsd": 0.85,
      "tmScore": 0.956,
      "alignedLength": 459,
      "sequenceIdentity": 94.7,
      "gdt_ts": 95.6,
      "gdt_ha": 91.2
    }
  }
}
```

##  TODO 待办事项

### 🔧 功能增强
- [ ] **US-align集成优化** - 完善服务器端US-align工具的部署和配置
- [ ] **批量比较分析** - 支持多个亚基同时进行比较分析
- [ ] **高级搜索功能** - 实现基于序列相似性、功能域、物种分类的高级搜索
- [ ] **用户系统** - 添加用户注册、登录和个人数据管理功能
- [ ] **API文档** - 完善REST API文档和使用示例
- [ ] **性能优化** - 实现数据缓存和懒加载机制
- [ ] **移动端适配** - 优化移动设备上的用户体验

### 🧪 测试和质量
- [ ] **单元测试** - 为核心功能添加完整的测试覆盖
- [ ] **集成测试** - 测试API接口和数据流
- [ ] **性能测试** - 大数据量下的性能基准测试
- [ ] **可访问性** - 改进无障碍访问支持

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [US-align](https://zhanggroup.org/US-align/) - 结构比对工具
- [BioMSA](https://github.com/malanjary-ut/biomsa) - 多序列比对库
- [Molstar](https://molstar.org/) - 3D分子可视化
- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库
