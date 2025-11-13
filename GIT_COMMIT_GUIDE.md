# Git 提交规范说明

## Commit Message 格式

提交信息必须遵循以下格式：

```
<type>: <subject>
```

或带有作用域：

```
<type>(scope): <subject>
```

### Type 类型说明

- **feat**: 新功能
- **fix**: 修复 bug
- **docs**: 文档更新
- **style**: 代码格式（不影响代码运行的变动）
- **refactor**: 重构
- **perf**: 性能优化
- **test**: 测试
- **build**: 构建系统或外部依赖的变动
- **ci**: CI 配置文件和脚本的变动
- **chore**: 其他不修改 src 或 test 文件的变动
- **revert**: 回退

### 示例

✅ 正确示例：

```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复登录页面按钮点击无响应问题"
git commit -m "docs: 更新 README 文档"
git commit -m "style: 格式化代码缩进"
git commit -m "refactor: 重构用户模块代码结构"
```

❌ 错误示例：

```bash
git commit -m "更新代码"  # 缺少 type
git commit -m "Feat: 添加功能"  # type 必须小写
git commit -m "feat: 添加功能。"  # 不能以句号结尾
```

## 提交流程

当你提交代码时，会自动执行以下检查：

1. **pre-commit**: 在提交前自动运行
   - 对暂存的文件执行 ESLint 检查并自动修复
   - 对暂存的文件执行 Prettier 格式化

2. **commit-msg**: 检查提交信息格式
   - 验证 commit message 是否符合规范
   - 不符合规范会阻止提交

## 常用命令

```bash
# 格式化所有代码
pnpm format

# 检查代码规范
pnpm lint

# 自动修复代码问题
pnpm lint:fix

# 类型检查
pnpm typecheck
```

## 跳过检查（不推荐）

如果确实需要跳过检查（非常不推荐），可以使用：

```bash
git commit --no-verify -m "你的提交信息"
```
