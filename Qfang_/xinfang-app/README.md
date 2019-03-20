项目运行

    npm run start

项目打包

    Android      http://git.qfang.com/mobile-broker/QfangJoin.git
    Ios          http://git.qfang.com/mobile-broker/broker-platform-ios.git

    打包之前，先更新原生的代码，然后运行 npm run bundle

登录获取sessionId

    1，host 配置
    #新房经纪人app 原生登录
    192.168.0.130  agentapp.qfang.com

    2，账号密码：13418855555 855555
    账号密码：15806080705 050021
    http://agentapp.qfang.com/qfang-agent-api/api/mobile/unified/login?params=%7B%22password%22:%22855555%22,%22phone%22:%2213418855555%22%7D

    http://agentapp.qfang.com/qfang-agent-api/api/mobile/unified/login?params=%7B%22password%22:%22050021%22,%22phone%22:%2215806080705%22%7D


热更新  build/DiffPatch  注意：：：目前暂时 不确定 更换iconfont 是否可以热更新成功

    Usage: diffPatch <command>
    diffPatch -s 	 old bundle file path
    diffPatch -d 	 new bundle file path
    diffPatch -o 	 output bundle file path

    运行下面命令时，
    npm run patch-android
    npm run patch-ios
    npm run patch-android
    必须提前做好2件事
        1，分别在 原生的安卓和ios目录下 执行 git checkout .  确保原来的bundle文件是上次发版的；
        2，运行npm run bundle ，确保生产最新的bundle文件
