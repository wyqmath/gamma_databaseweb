# γ-分泌酶比较数据库

一个用于比较不同物种γ-分泌酶复合物亚基的综合性网络平台，提供详细的序列比对、结构分析和进化洞察。

##  TODO 待办事项

### 🔧 核心功能开发
- [ ] **序列比对算法优化** - 实现更精确的序列比对算法，支持多种比对参数
- [ ] **3D结构交互增强** - 添加结构叠加、测量工具、标注功能
- [ ] **进化分析工具** - 实现系统发育树构建、分子进化速率分析
- [ ] **批量数据处理** - 支持批量上传和处理蛋白质序列数据
- [ ] **高级搜索功能** - 实现基于序列相似性、功能域、物种分类的高级搜索

##�🛠 技术栈

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
