
# Git
## 目录：
- [Git](#Git)
 - [常见命令](#常见命令)
 - [版本回退](#版本回退)
 - [撤销修改](#撤销修改)
 - [分支管理](#分支管理)
 - [远程仓库](#远程仓库)
 - [多人协作](#多人协作)
 - [标签管理](#标签管理)
 - [忽略文件](#忽略文件)
   - [.gitignore](#.gitignore)
   - [忽略已经加入git仓库的文件](#忽略已经加入git仓库的文件)
- [附录](#附录)
  - [SSH Key创建方法](#SSH-Key创建方法)

## Git
Git是分布式版本控制系统（而SVN不是），同一个Git仓库，可以分布到不同的机器上。  

关于git的详细介绍见廖雪峰[Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

[Git和SVN的区别](http://www.jianshu.com/p/bfec042349ca)

### 常见命令

- git init 初始化一个git仓库
- git add &lt;file&gt; 添加文件到仓库（实际是到暂存区，[关于git的工作区和暂存区的详细介绍](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000)）  
    git add -f App.class  强制添加到仓库（用于文件被.gitignore忽略时）
- git commit -m "" 提交文件到仓库（将暂存区中的所有内容提交）  
    注意，如果修改文件后想快速提交，可用 `git commit -am ""`，参数`-a`表示`add`。
- git status 查看仓库当前状态
- git diff &lt;file&gt; 查看file的修改内容
- git clone &lt;path&gt; 克隆远端库到本地（切换分支也是这个命令）
- git push origin &lt;branch&gt; 推送分支到远程库




### 版本回退（已经commit）
- git log [params] 查看提交历史记录（params参数：`--pretty=oneline`一行美化显示 ；`--graph`查看分支合并图；`--abbrev-commit`更加简短的commit_id）  
    git log --graph --pretty=oneline --abbrev-commit
- git reflog 查看命令历史
- git reset HEAD^ --hard  回退到上一个版本  
   git reset HEAD^^ --hard  回退到上上一个版本  
   git reset HEAD~100 --hard 回退到上100个版本  
   git reset &lt;commit_id&gt; --hard  回退到某次commit_id的版本（通过`git reflog`查看commit_id）  
- git push -f origin develop 将回退提交到远程。（适用于已经push到远程的情况。）
### 撤销修改（未commit）
- git checkout -- &lt;file&gt; 丢弃工作区的修改（在工作区做了修改，但还未`git add`时）
- git reset HEAD &lt;file&gt; 把暂存区的修改撤销掉，重新放回工作区(已经`git add`，但未`git commit`)
如果已经git commit，请查看前面的版本回退。

### 分支管理
- git branch dev 创建分支
- git checkout dev 切换分支  
    以上2个命令可以用以下一个命令代替：  
- git checkout -b dev 创建分支并切换分支  

- git branch 列出本地所有分支，当前分支前面会标一个*号。加一个参数`-a`可查看远程分支(`git branch -a`)。  
- git push origin dev 将分支推送到远程分支  
- git branch -d dev  删除dev分支  
    如果我们创建了一个分支做了修改，然后并没有合并到其他分支，这时用以上代码：  
```javascript
$ git branch -d test
error: The branch 'test' is not fully merged.
If you are sure you want to delete it, run 'git branch -D test'.
```
    git会提醒我们，该分支还没有被合并，删除后会丢失修改，如果要强行删除需要使用  
- git branch -D test  强制删除test分支
    当然，一般这个命令很少用。

 **合并分支：**  
 若想将dev分支合并到master分支：1.先切换到master分支，2.再`merge dev`分支到master。
 ```javascript
 $ git checkout master
 $ git merge dev
 ```
 通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。  
 如果我们强制禁用`Fast forward`模式，Git就会在merge时生成一个新的`commit`，这样，从分支历史上就可以看出分支信息。
- git merge --no-ff -m "merge with no-ff" dev  //合并分支，--no-ff参数，表示禁用Fast forward；-m参数，创建一个新的commit。
- git log --graph --pretty=oneline --abbrev-commit 查看到的log会有分支信息。

 **bug分支**  
当我们在dev分支中开发时，需要立即修复一个紧急bug(假定bugID是123)，这时一般是新建一个分支`issue-123`，但是当前在dev上的开发还未完成，不能提交代码。这时该怎么办？  
还好，git提供了一个`stash`功能，可以将当前的工作现场“储藏”起来，以待日后恢复。
- git stash 将现场储藏起来
这个时候用`git status`查看工作区，就是干净的，可以切换分支等操作。  
那么我们可能会经历以下一系列的操作：
```javascript
$ git checkout master
$ git checkout -b issue-123  //创建并切换到分支，并进行bug修改
$ git commit -m "fix bug 123"
$ git checkout master
$ git merge --no-ff -m "merged bug fix 123" issue-123
$ git branch -d issue-123
```
至此，我们就完成了bug：123的修复。接下来我们切换回dev分支。  
```javascript
$ git checkout dev
$ git status //查看工作区，是干净的。
```
下面我们来恢复之前的工作现场。  
- git stash list  查看储藏的现场列表
```javascript
$ git stash list
stash@{0}: WIP on dev: 6224937 add merge
```
工作现场还在，现在有2个方法可以恢复：
- git stash apply 恢复后，stash内容不会被删除，需要用
- git stash drop 来删除
- git stash pop 恢复后，stash内容会被删除
```javascript
$ git stash apply stash@{0} //恢复指定的stash
```

### 远程仓库
在github上注册账号，并设置SSH Key（具体方法见附录），并创建新的仓库。然后将本地仓库和远程仓库关联。  
在创建完新的仓库后，你会看到形似如下代码：  

**…or create a new repository on the command line**
```javascript
echo "# ledou" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:hekui/ledou.git
git push -u origin master
```
使用如下命令：  
- git remote add origin &lt;path&gt; 创建关联，path就是远端路径。
- git remote set-url origin &lt;path&gt; 修改远端路径。
- git checkout -b master origin/master 创建master分支与远端master分支关联，并从远端捡出代码。
- git push -u origin master 把本地库的所有内容推送到远程库上，-u参数是将对应的分支关联，简化以后的推送。

- git remote 查看远程库的信息，加参数`-v`，显示更详细的信息。
```javascript
$ git remote origin
$ git remote -v
origin git@github.com:hekui/ledou.git (fetch)
origin git@github.com:hekui/ledou.git (push)
```

### 多人协作
因为使用 `git clone <path>`命令克隆远程仓库，默认只会克隆master分支。
要克隆其他分支，需要使用：
- git checkout -b dev origin/dev
如果你在本地创建了dev分支，然后远程仓库有了同样的dev分支，怎么关联呢？
- git branch --set-upstream dev origin/dev

### 标签管理
发布一个版本是，我们通常是先给该版本打一个标签（tag），标签也是版本库的一个快照，实际上就是指向某个commit的指针。
> 标签跟分支很像，但是分支可以移动，而标签不能。  

先切换到需要打标签的分支。然后：
- git tag v1.0 打标签（默认标签是打在最新提交的commit上的）
- git tag  查看所有标签

如果想要在之前某天打标签，需要先查看log(`$ git log --pretty=oneline --abbrev-commit
`)，找到当天对应的commit id，然后使用：
- git tag v0.9 &lt;commit_id&gt; 例如：git tag v0.9 81aa8d5
在我们打了标签后，若要查看某个标签的详细信息，
- git show &lt;tagname&gt; 查看标签信息
- git tag -a v1.0 -m "说明信息" &lt;commit_id&gt;  创建具有说明的tag(`-a`指定标签名，`-m`指定说明文字)  

- git tag -d v0.8  删除标签
- git push origin &lt;tagname&gt; 推送某个标签到远程
- git push origin --tags  推送全部标签到远程
若要删除远程标签，就要麻烦一些了：
```javascript
$ git tag -d v0.8
$ git push origin :refs/tags/v0.8
```

### 忽略文件
#### .gitignore  
一般情况下，使用`.gitignore`配置即可。  
**配置语法：**
- 以斜杠 `/` 开头表示目录;
- 以星号 `*` 通配多个字符;
- 以问号 `?` 通配单个字符;
- 以方括号 `[]` 包含单个字符的匹配列表;
- 以叹号 `!` 表示不忽略匹配到的文件或目录;

**示例：**  
```javascript
/node_modules/ //忽略根目录下的node_modules目录
node_modules/ //忽略所有的node_modules目录
*.less //忽略所有.less文件
```

#### 忽略已经加入git库的文件  
但是，我们经常有这样一种情况。  
有个文件，我们必须入库，大家一起共享，但是呢。每个人本地的配置又是因自己本地的环境而异。这样的话，这个文件就很崩溃了。你要入库，通过`.gitignore`和`excludes`都不起作用。每次`git status`都会提示你有修改，这时我们需要用到：
```javascript
//执行命令将<file>加入不提交队列
git update-index --assume-unchanged <file>
```
如果某天，我们需要将该文件提交，那需要：  
```javascript
//执行命令将<file>取消加入不提交队列
git update-index --no-assume-unchanged <file>
```
注意：如果代码是revert回来的（比如你误提交了代码，然后你先回退后再提交后，然后你本地再revert回之前的修改代码），那么你的代码默认是执行了`git add`的，需要先`git reset HEAD <file>`撤销add，然后再执行以上的`git update-index --assume-unchanged <file>`代码。

## 附录：
### SSH Key创建方法
#### 第1步：创建SSH Key。  
在用户主目录下（一般形似这样的路径：`C:\Users\Bravowhale\`），看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
```javascript
$ ssh-keygen -t rsa -C "<your email>" //引号中为你在github注册的邮箱
```
然后一路回车，使用默认值即可。  
成功后，可以找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

#### 第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容，保存即可。
