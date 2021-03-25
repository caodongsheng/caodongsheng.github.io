<template>
  <div class="big">
    <div class="top-header">
      <div class="header-wrap">
      </div>
    </div>
    <div class="main">
      <div class="app-container">
        <el-form :model="formModel" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  style="text-align: left;">
          <el-form-item label="身份选择" :rules="[{ required: true, message: '请选择身份', trigger: 'change' },]">
            <el-select v-model="formModel.id" placeholder="请选择活动区域" @change="check">
              <el-option v-for="item in levelOptions" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },]">
            <el-input v-model="formModel.name" placeholder="输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="uCard">
            <el-input v-model="formModel.uCard" placeholder="输入真实身份证号"></el-input>
          </el-form-item>
          <el-form-item label="负责区域" :rules="[{ required: true, message: '请输入负责区域', trigger: 'blur' },]">
            <el-select v-model="formModel.province" placeholder="省" @change="getProv($event)">
              <el-option v-for="(item,index) in province" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--省-->
            <el-select v-model="formModel.town" v-if="formModel.province!== ''" placeholder="市"  @change="getTown($event)">
              <el-option v-for="(item,index) in town"  :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--市-->
            <el-select v-model="formModel.area" v-if="formModel.town!==''" placeholder="区" @change="getCalm($event)">
              <el-option v-for="(item,index) in area" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--区-->
            <el-select v-model="formModel.calm" v-if="formModel.area!==''" placeholder="镇" @change="getBurg($event)">
              <el-option v-for="(item,index) in calm" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--镇-->
            <el-select v-model="formModel.burg" v-if="value === 5 && burg.length !== 0" placeholder="村" @change="getRegionName($event)">
              <el-option v-for="(item,index) in burg" :key="index" :label="item.regionName" :value="item.id"/>
            </el-select><!--村-->
          </el-form-item>
          <el-form-item label="输入手机号" prop="uPhone">  
            <el-input v-model="formModel.uPhone" placeholder="输入11位手机号"></el-input>   
          </el-form-item>
          <el-form-item label="设置密码" prop="pass">  
            <el-input v-model="formModel.pass" :type="passwordType" placeholder="密码必须由 8-20位字母、数字、特殊符号线组成"></el-input>   
            <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="changeye" /></span>
          </el-form-item>
          <el-form-item label="短信验证">  
            <el-input v-model="formModel.phoned" placeholder="输入短信验证码" style="width: 254px"></el-input>  
            <el-button type="success" @click="getPhone">获取验证码</el-button> 
          </el-form-item>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <v-swiperTouch :sID="sID" @commitSuccess="commitSuccessState" @commitFail="commitFailState"></v-swiperTouch>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <p style="font-size: 14px;cursor: pointer" @click="freeShow = true">  
            点击提交即同意《中国社会扶贫网用户注册协议》《免责条款》 
          </p>
          <el-dialog
            title="提示"
            :visible.sync="freeShow"
            width="60%"
            center>
            <div calss="mianze" style="height: 500px;overflow: scroll;">
              <h1 style="font-size: 1.7em; margin-bottom: 15px; color: #f37306; text-align: center;">免责条款</h1>
              <main><div>
                社会扶贫网科技有限公司是一家依法设立并有效存续的有限责任公司，依法设立并运营中国社会扶贫网（http://www.zgshfp.com.cn）。以下所称“本网站”包含中国社会扶贫网及中国社会扶贫网网站运营主体社会扶贫网科技有限公司，除非依据上下文应理解为中国社会扶贫网网站本身。
              </div> <div>
                在您注册成为本网站用户前，应当认真阅读《中国社会扶贫网用户注册协议》（“本协议”）的所有条款。请您务必认真阅读并充分理解各条款内容，特别是免除或限制责任的条款、法律适用和争议解决条款。以粗体或下划线标识的条款，您应重点阅读。如您对本协议有任何疑问，可向中国社会扶贫网客服咨询。如您同意以下条款，完成在本网站注册后，您将有权依据本协议的条款享受本网站提供的服务，同时有义务接受本协议条款的约束。
              </div> <h6>一、协议签署与修订</h6> <div data-v-77da7b6c="">
                1.1本协议的内容包括本协议全部条款以及本网站已或将发布并不时修改的各类规则，该等规则均为本协议不可分割的一部分，与本协议具有同等法律效力。
              </div> <div>
                1.2本网站有权根据需要不时修改本协议，或根据本协议制定、修改各类具体规则，并在本网站公告板块公示发布（“公告”），无需另行单独通知您。相关条款和规则一经公告，即于公告所载明的特定生效日期自动生效。您应持续关注本网站及该等公告，如不同意接受该等变更，请您在该等公告发布之日起2日内致电本网站客服【电话400-600-1017】 表明希望终止本协议（本段通话将会被录音），本网站将与您协商本协议终止后双方义务的履行。如您在本条所述时限内未致电本网站客服，则本条所述时限届满之时，视为您已自公告发布之时即同意接受该等变更。经修订的相关条款和规则一经公告，即于公告规定的特定生效日期自动生效并对您产生法律约束力。若您不同意修改后的协议内容，您应立即停止使用本网站的服务。
              </div> <div>
                1.3您只要勾选位于注册页面下方的【“我已阅读并且同意《中国社会扶贫网用户注册协议》”选项】并按照本网站的流程成功注册后，即视为您已经充分阅读、理解和同意本协议全部条款及本网站各类规则，本协议即生效。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。
              </div> <div>
                1.4本协议及通过本网站进行的交易所缔结的协议均采用电子合同方式。您登录本网站后，根据本网站的相关规则，在本网站通过点击确认或类似方式签署的电子合同即视为以您本人名义签署的合同，该合同是您真实的意思表示，对您具有法律效力。您确认并同意不得以未签署书面协议为由否认本协议及相关协议的效力，您确认并同意全面接受和履行在本网站签订的任何电子法律文本，并承诺按该等法律文本享有和/或放弃相应的权利、承担和/或豁免相应的义务。
              </div> <div>
                1.5 本协议项下，本网站<b><u>经营者可能根据网站的业务调整而发生变更，变更后的网站经营者与您共同履行本协议并向您提供服务，网站经营者的变更不会影响您本协议项下的权益。网站经营者还有可能因为提供新的网站平台服务而新增，如您使用新增的网站平台服务的，视为您同意新增的网站经营者与您共同履行本协议。发生争议时，您可根据您具体使用的服务及对您权益产生影响的具体行为对象确定与您履约的主体及争议相对方。</u></b></div> <h6 data-v-77da7b6c="">二、用户身份限制</h6> <div data-v-77da7b6c="">
                2.1作为本网站用户，确认在您开始注册使用本网站服务前，您必须具备中华人民共和国法律规定的与您行为相适应的民事行为能力，即是18周岁以上具有完全民事行为能力和民事权利能力、或16周岁以上不满18周岁以自己的劳动收入为主要生活来源的具有完全民事行为能力和民事权利能力，能够独立承担民事责任的自然人，或依法设立并有效存续的能够独立承担民事责任的法人和其他组织。如您不符合上述资格，您应立即停止在本网站的注册程序、停止使用本网站服务，否则本网站有权随时中止或终止您的用户资格，您应对您的注册给本网站及相关主体带来的损失承担全额赔偿责任，且您的监护人（如您为限制民事行为能力的自然人）或您的实际控制人（如您为实体）应承担连带责任。
              </div> <div>
                2.2作为本网站用户，如本网站要求提供您的真实资料和信息，您应提供且保证在使用本网站服务的所有期间，所提交的资料和信息（包括但不限于【电子邮件地址、联系电话、联系地址、邮政编码、个人身份信息、征信信息、银行账号信息】等）真实、准确、完整，且是提交时最新的信息。您了解并同意，您有义务保持您提供信息的真实性及有效性。在您使用本网站服务的期间内，如您向本网站提供的各项资料或信息在提交后发生变更，您应当及时向本网站更新相应的资料和信息。否则，由此导致的全部法律责任和后果将由您独立承担。
              </div> <div>
                2.3您确认并同意，如您在本网站申请发布项目/信息，本网站有权根据内部控制制度要求您提供进一步的信息，审核确认您的项目/信息需求，决定是否审核通过您的项目发布申请。只有经本网站审核同意并按照本网站要求签署相关文件，您的项目/信息需求才可通过本网站发布。
              </div> <div>
                2.4 您设置的网站账号不得违反国家法律法规及本网站规则关于账号的管理规定，否则网站可回收您的账号。您不得冒充他人进行注册，不得未经许可为他人注册，不得以可能误导其他用户的方式注册账号，不得使用可能侵犯他人权益的用户名进行注册（包括但不限于涉嫌商标权、名誉权等侵权行为）
              </div> <div>
                2.5 您不得对本网站内容或社会扶贫网产品、程序及服务（包括但不限于内容或产品中的广告或赞助内容）进行任何形式的许可、出售、租赁、转让、发行或做其他商业用途；
              </div> <div>
                2.6 除非法律明文规定，否则您不得对本网站或社会扶贫网产品、程序及服务（包括但不限于内容或产品中的广告或赞助内容）的任何部分以任何形式或方法进行复制、发行、再版、下载、显示、张贴、修改、翻译、合并、利用、分解或反向编译等；
              </div> <div>
                2.7 您的账户为您自行设置并由您保管，本网站任何时候均不会主动要求您提供您的账户密码。因此，建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开网站。
              </div> <div><b><u>账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，本网站并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。</u></b></div> <div>
                2.8除网站存在过错外，<b><u>您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、购买商品及服务及披露信息等）负责。</u></b></div> <h6>三、本网站的服务内容</h6> <div>3.1本网站提供的服务主要包括【根据用户需求发布信息、提供交易管理服务及其他客户服务】等，具体以本网站当时提供的服务内容为准。
                <p>3.2本网站为您本人在本网站上形成的交易提供居间等相关服务，包括
                </p><p></p><p>(1)在适用法律和技术手段允许和合理的范围内，本网站对在交易中相关主体的基本信息进行必要的查验。
                </p><p></p><p>(2)通过中国社会扶贫网核对贫困户信息，并以适当方式在本网站上公示该等信息。
                </p><p></p><p>(3)匹配爱心帮扶、爱心需求信息。
                </p><p></p><p>(4)为您在本网站开设您的个人账号。
                </p><p></p><p>(5)基于本网站向您开放的功能，向您提供代收/代付服务。一经您使用前述服务，即表示您不可撤销地授权本网站进行相关操作，且该等操作是不可逆转的，您不能以任何理由拒绝付款或要求取消交易。就前述服务，您应按照本网站及第三方的规定支付费用。与第三方之间就费用支付事项产生的争议或纠纷，与本网站无关。
                </p><p></p><p>(6)查询：本网站将对您在本网站的有关操作进行记录。您可以通过您的账号实时查询交易记录。您理解并同意通过本网站查询的任何信息仅作为参考，不作为相关操作或交易的证据或依据。
                </p><p></p><p>(7)本网站的相关交易规则、您与相关主体签署的具体交易协议（包括但不限于该等协议项下您对本网站作出的授权）中规定的其他服务。
                </p><p></p><p>(8)本网站发布的帮扶信息不适用于《中华人民共和国慈善法》所规范的慈善公开募捐相关内容，真实性由帮扶信息发布者个人承担所有责任。
                </p><p></p><p>3.3本网站为您提供合同管理服务，为您提供电子合同的备案、查看、核对服务。如对此有任何争议，应以本网站记录的合同为准。您不得私自仿制、伪造在本网站上签订的电子合同或印章，不得用伪造的合同进行任何交易或做其他非法使用，否则由您自行承担法律责任。
                </p><p></p><p>3.4本网站目前不会向您收取任何服务费用。本网站保留单方面制定及调整收费规则（包括但不限于收费标准和收费项目）的权利。本网站提请您注意，在您使用相关服务的过程中，第三方平台可能会向您收取费用。</p></div> <h6 data-v-77da7b6c="">四、用户使用规则</h6> <div data-v-77da7b6c="">4.1您不得利用本网站或本网站服务从事任何不符合我国法律法规规定或侵犯他人权益的活动。本网站在发现您从事该等活动时，有权不经通知而立即停止您对本网站的全部或部分功能的使用。在使用本网站提供的任何服务的过程中，您不得发送、公布或展示任何垃圾邮件、信息或其他可能违反中国法律法规及本协议的内容。本网站在发现您从事该等活动或发布该等内容时，有权不经您同意而删除该等内容，并有权不经通知而立即暂停或停止您对本网站的全部或部分功能的使用。
                <p>4.2您保证并承诺您通过本网站平台进行交易的资金来源合法。您同意，本公司有权按照相关执法部门的要求协助对您的账号及资金等进行查询、冻结或扣划等操作。同时，本网站有权基于交易安全等方面的考虑不时设定涉及交易的相关事项，包括但不限于交易限额、交易次数等。您了解，本网站的前述设定可能会对您的交易造成一定不便，您对此没有异议。
                </p><p></p><p>4.3您若发现有第三人冒用或盗用您的用户账号及密码，或其他任何未经合法授权的情形，应立即电话通知本网站，要求本网站暂停相关服务，否则由此产生的一切责任由您本人承担。同时，您理解本网站对您的请求采取行动需要合理期限，在此之前，本网站对第三人使用该服务所导致的损失不承担任何责任。
                </p><p></p><p>4.4您确认，您在本网站上所确认的交易状态，将成为本网站为您进行相关交易或操作（包括但不限于支付或收取款项、订立合同等）的不可撤销的指令。您同意相关指令的执行时间以本网站系统中记录的时间为准。您同意本网站有权依据本协议及本网站相关纠纷处理规则等约定对相关事项进行处理。您未能及时对交易状态进行修改、确认或未能提交相关申请所引起的任何纠纷或损失由您自行负责，本网站不承担任何责任。
                </p><p></p><p>4.5您同意，本网站有权在提供本服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息，并且，您同意接受本网站向您发送商品促销或其他相关商业信息。
                </p><p></p><p>4.6 您应当遵守诚实信用原则，确保对您在本网站上发布的信息真实，不得在本网站上发布以下信息：</p> <p>（一）违反国家法律法规禁止性规定的；</p> <p>（二）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p> <p data-v-77da7b6c="">（三）欺诈、虚假、不准确或存在误导性的；</p> <p data-v-77da7b6c="">（四）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；</p> <p data-v-77da7b6c="">（五）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；</p> <p data-v-77da7b6c="">（六）存在可能破坏、篡改、删除、影响本网站任何系统正常运行或未经授权秘密获取网站及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；</p> <p data-v-77da7b6c="">（七）其他违背社会公共利益或公共道德或依据相关本网站协议、规则的规定不适合在本网站上发布的。</p></div> <h6 data-v-77da7b6c="">五、用户信息的使用与保护</h6> <div data-v-77da7b6c="">5.1本网站非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，您在使用本网站提供的服务时，您同意本网站在业务运营中收集和储存您的用户信息，包括但不限于您自行提供的资料和信息。本网站也可能采取其他方式或自其他来源收集您的额外资料，以更好地了解本网站用户，但本网站仅收集本网站认为就此目的及达成该目的所必须的关于您的个人资料。本网站收集和储存您的用户信息的主要目的在于提高为您提供服务的效率和质量。
                <p>5.2您同意本网站在业务运营中使用您的用户信息，同时，您同意本网站在某些网页上使用诸如“Cookies”的资料收集装置。“Cookies”是设置在您的硬盘上的小型文件档案，以协助本网站为您提供量身订造的服务。本网站亦提供某些只能通过使用“Cookies”才可得到的功能。
                </p><p></p><p>5.3本网站将采用行业标准惯例以保护您的用户信息，包括建立相应的信息保护制度和机制、设备等，但您应了解，上述保护措施可能受限于技术限制而不能确保您的信息不会通过本协议中未列明的途径泄露出去，本网站不承担因此而导致的任何损失或责任。
                </p><p></p><p>5.4您同意本网站有权根据有关法律和监管要求、本网站风险控制要求以及相关协议要求向司法机关等政府部门、社会组织或团体、其他第三方服务或合作机构提供您的个人资料。在您未能按照与本网站签订的服务协议，或者未按照相关协议的约定履行自己应尽的义务时，本网站有权根据自己的判断或者与该笔交易有关的其他用户的请求披露您的个人资料。
                </p><p></p><p>5.5紧急情况发生时，本网站有权基于单方独立判断，不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分服务（包括收费服务），或为您的利益采取相应的紧急措施，且无需对您或任何第三方承担任何责任。前述情形包括但不限于：
                </p><p></p><p>(1)本网站发现异常交易时；
                </p><p></p><p>(2)本网站认为发生洗钱、套现、传销、被冒用或其他有风险之情形；
                </p><p></p><p>(3)本网站认为相关用户已违反法律法规、本协议的规则及精神；
                </p><p></p><p>(4)您未按规定向本网站及/或债权人支付相应的款项。</p></div> <h6>六、免责条款</h6> <div>6.1您同意，本网站及其股东、实际控制人、董事、代理人、关联方、子公司和雇员（以下称“本网站方”）均不以任何明示或默示的方式对您使用本网站服务而产生的任何形式的直接或间接损失承担法律责任。
                <p>6.2您不应向其他任何人泄露您在注册时向本网站提交的【用户名、密码、安全问题及答案、银行账号、个人邮箱、电话号码】，上述信息是您在本网站的身份识别信息。您应妥善保管您的用户名、密码等与账号有关的一切信息，使用您的用户名和密码登陆本网站后在本网站的一切行为以及以您在本网站注册时提交的个人电子邮箱发送邮件的行为均代表您本人并由您承担相应的法律后果。如因非本网站原因造成您的账号密码或相关信息泄露的，您应及时通知本网站，以减少可能发生的损失，因上述原因导致的损失需由您自行承担。
                </p><p></p><p>6.3如您发现有他人冒用或盗用您的账号及密码或进行任何其他未经合法授权行为之情形时，应立即以书面方式通知本网站并要求本网站暂停服务。本网站将积极响应您的要求；但您理解，对您的要求采取行动需要合理期限，在此之前，本网站对已执行的指令及(或)所导致的您的损失不承担任何责任。
                </p><p></p><p>6.4本网站用户如在本网站通过网络相识、交往中所发生或可能发生的任何心理、生理上的伤害和经济上的纠纷与损失，本网站均不承担任何责任。本网站用户发表的文章、信息、内容违反法律规定，或侵犯他人合法权益的，由内容提供方承担法律责任，本网站均不承担任何责任。
                </p><p></p><p>6.5本网站内容可能涉及或链接到由第三方所有、控制或者运营的其他网站（“第三方网站”）。本网站不能保证也没有义务保证第三方网站上的信息的真实性和有效性。您应按照第三方网站的服务协议使用第三方网站，而不是按照本协议。第三方网站的内容、产品、广告和其他任何信息均由您自行判断并承担风险，而与本网站无关。
                </p><p></p><p>6.6如果由于本网站及相关第三方的设备、系统故障或缺陷、病毒、黑客攻击、网络故障、网络中断、地震、台风、水灾、海啸、雷电、火灾、瘟疫、流行病、战争、恐怖主义、敌对行为、暴动、罢工、交通中断、停止供应主要服务、电力中断、经济形势严重恶化、政府管制或其它类似事件，致使本网站未能履行本协议或履行本协议不符合规定，不构成本网站的违约。本网站均不负责赔偿，您的补救措施只能是与本网站协商终止本协议并停止使用本网站。
                </p><p></p><p>6.7如果本网站发现了因系统故障或其他任何原因导致的处理错误，本网站有权纠正该错误。如果该错误导致您实际收到的款项多于应获得的金额，本网站保留纠正不当执行交易的权利，您应根据本网站的要求返还多收的款项或进行其他操作。您理解并同意，您因前述处理错误而多付或少付的款项均不计利息，本网站不承担因前述处理错误而导致的任何损失或责任（包括您可能因前述错误导致的利息、汇率等损失）。</p></div> <h6 data-v-77da7b6c="">七、知识产权</h6> <div data-v-77da7b6c="">
                本网站的所有内容，包括但不限于文本、数据、图片、音频、视频、源代码及其他全部信息受中华人民共和国著作权法及各国际版权公约的保护，其知识产权属于本网站或相应权利人。未经本网站或相应权利人事先书面同意，您或其他任何人不得复制、改编、传播、公布、展示或以任何其他方式侵犯本网站或相应权利人的知识产权。
              </div> <h6>八、违约责任</h6> <div>
                如果您违反了您在本协议中所作的陈述、保证、承诺或任何其他义务，致使本网站或本网站的股东、实际控制人、员工、本网站其他用户承受任何损失，您应向受损失的一方做出全额赔偿。
              </div> <h6>九、适用法律和管辖</h6> <div>
                本协议适用中华人民共和国法律。与本协议有关的争议由社会扶贫网科技有限公司住所地有管辖权的人民法院管辖。
              </div> <h6>十、协议有效期及终止</h6> <div>10.1除非本网站终止本协议或者您申请终止本协议及注销相应用户账号且经本网站同意，否则本协议始终有效。
                <p>10.2在您违反了本协议、相关规则，或在相关法律法规、政府部门的要求下，本网站有权通过站内信、电子邮件、短信通知等方式终止本协议，关闭您的账号或者限制您使用本网站。但本网站的终止行为并不免除您根据本协议或在本网站生成的其他协议项下的还未履行完毕的义务。
                </p><p></p><p>10.3当您决定不再使用本网站用户账号时，应首先清偿所有应付款项（如有），再将可用款项（如有）全部取回，并向本网站申请注销该用户账号，经本网站审核同意后可正式注销用户账号。
                </p><p></p><p>10.4当您不再符合本协议第二条约定的注册用户身份条件（包括但不限于不再具中国公民身份、因故身亡、丧失民事行为能力、企业破产等）致使本协议无法继续履行时，本协议依法终止。您的合法授权代表、继承人、监护人、直系亲属在提交相关证明文件后，可向本网站申请查询您在本网站注册的用户信息及其他交易信息，并办理资产、负债的转移。同时，本网站有权关闭您的账号。</p></div> <h6 data-v-77da7b6c="">十一、风险提示</h6> <div data-v-77da7b6c="">11.1您了解并认可，任何通过本网站进行的行为并不能避免以下风险的产生，本网站不能也没有义务为政策风险、信用风险、商业风险、用户自身过错、不可抗力风险负责。
                <p>11.2本网站不对任何交易、信息提供任何担保，不能完全保证平台信息的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。您依赖于自身的独立判断进行交易等各项民事行为，您应对您作出的判断承担全部责任。
                </p><p></p><p>11.3以上并不能揭示您通过本网站进行交易的全部风险及市场的全部情形。您在作出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</p></div> <h6>十二、通知</h6> <div>12.1本协议项下的通知如以公示方式做出，一经在本网站公开发布即视为已经送达。
                <p>具有专属性信息的通知，本网站将通过您在本网站中个人账号中的【个人收件箱】发送，一经发送即视为已经送达。请您密切关注您的【个人收件箱】中的信息。</p></div> <h6>十三、附则</h6> <div>13.1本协议是由您与本网站共同签订的，适用于您在本网站的全部活动。
                <p>13.2本协议相关条款标题仅为检索方便而设立，其含义应根据实际条款意义理解。</p> <p>13.3若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效。
                </p><p></p><p>13.4本网站不涉入您与本网站的其他注册用户、交易对手之间因相关交易而产生的法律关系及法律纠纷。
                </p><p></p><p>13.5本网站有权将本协议项下的权利义务转让给本网站的关联方，在发生前述情形时，视为您在签署本协议时即已事先作出了书面同意。
                </p><p></p><p>13.6您同意始终遵守本网站发布的各项规则，同意受中国社会扶贫网相关规则的约束。您确认在本合同项下赋予本网站的权利、及/或对本网站作出的授权，对您具有不可撤销的约束力，本网站可根据本合同对其他方或第三方主张行使该等权利/授权，而无需您另行签署相应授权书等书面文件。
                </p><p></p><p>13.7本网站对本协议享有最终解释权。</p></div></main>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
          </el-dialog>

        </el-form>
        <p style="font-size: 14px"> 
          该注册功能只限乡级、村级扶贫干部提交注册信息，信息提交后请等待上级管理员审核。如果您已在中国社会扶贫网APP中注册成为爱心人士，也可使用相同手机号注册申请成为管理员。
        </p>
        <el-button type="success" style="margin-top: 60px;" @click="logis">返回登录</el-button>
        <el-button type="success" style="margin-top: 60px;" @click="loginup">提交</el-button>  
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import linkage from '@/components/linkage'
  import {card,validdateMobile,validpass} from  './rules'
  import swiperTouch from '../swiperTouch/swiperTouch.vue'
  import Bus from '../../assets/Bus'
  export default {
    data (){
      let checkcard = (rule,value,callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空'));
        }else if (card(value)) {
          return callback();
        } else{
          return callback(new Error('请输入正确的身份证号'));
        }
      }
      let checkphone = (rule,value,callback)=>{
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }else if (validdateMobile(value)) {
          return callback();
        } else{
          return callback(new Error('请输入正确的手机号'));
        }
      }
      let checkpass = (rule,value,callback)=> {
        if (!value) {
          return callback(new Error('密码不能为空'));
        } else if (validpass(value)) {
          return callback();
        } else {
          return callback(new Error('密码必须由 8-20位字母、数字、特殊符号线组成'));
        }
      }
      return {
        freeShow:false,
        sID: '81177363', // 注册场景id
        dialogVisible:false,
        path:"http://www.fp1017.org.cn/",
        markId:1,
        levelOptions: [{ id: 5, name: '村级管理员' }, { id: 4, name: '乡级管理员' }],
        formModel:{
          id:5,
          name:"",
          uCard:"",
          uPhone:"",
          pass:"",
          phoned:"",
          img:"",
          province:"",
          town:"",
          area:"",
          calm:"",
          burg:"",
        },
        town:[],
        province:[],
        area:[],
        calm:[],
        burg:[],
        provincename:"",
        townname:"",
        areaname:"",
        burgname:"",
        calmname:"",
        va:false,
        flag:false,
        territory:"",
        rules: {
          uCard:[{required: true,validator: checkcard, trigger: 'blur' }],
          uPhone:[{ required: true,validator: checkphone, trigger: 'blur'}],
          pass:[{ required: true,validator: checkpass, trigger: 'blur'}],
        },
        passwordType: 'password',
        suc:'',
        value:5
      }
    },
    components: {
      linkage,
      "v-swiperTouch": swiperTouch
    },
    created(){
      this.select()
    },
    methods:{
      commitSuccessState (res, token) {
        this.suc = res
        if (res === true) {
          this.$http.post('uts/user/getPhoneCode', {
            phone: this.formModel.uPhone,
            tcode: token,
            ywNo: 1
          }).then((res) => {
            this.dialogVisible = false
          }).catch((err) => {
            this.errorDialogContent = '请稍后重试'
          })
        }
        Bus.$emit('funClick', this.suc)
      },
      commitFailState (res,title) {
        alert(JSON.stringify(title.msg))
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      logis(){
        this.$router.push({
          path:"/login"
        })
      },
      check(value){
        this.value = value
        this.$refs.ruleForm.resetFields();
        this.formModel.province = ''
        this.formModel.town = ''
        this.formModel.area = ''
        this.formModel.calm = ''
        this.formModel.burg= ''
        this.provincename = ""
        this.townname  =""
        this.areaname = ""
        this.burgname = ""
        this.calmname = "";
        this.town = []
        this.area = []
        this.calm = []
        this.burg = []
      },
      select(){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:"100",
          type:1
        }).then(res => {
          this.province=res
        })
      },//省
      getProv(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:2
        }).then(res => {
          this.formModel.town=''
          this.formModel.area=""
          this.formModel.calm=""
          this.formModel.burg=""
          this.burg = []
          this.town=res
           let obj = {};
           obj = this.province.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === ev;//筛选出匹配数据
          });
           this.provincename = obj.regionName;
        })
      },//市
      getTown(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:3
        }).then(res => {
          this.formModel.area=""
          this.formModel.calm=""
          this.formModel.burg=""
          this.burg = []
          this.area=res
           let obj = {};
           obj = this.town.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === ev;//筛选出匹配数据
          });
           this.townname = obj.regionName;
        })
      },//区
      getCalm(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:4
        }).then(res => {
          if(res === "此父区划下无子区划"){
            this.calm=[]
          }else{
            this.formModel.calm=""
            this.formModel.burg=""
            this.calm=res
             let obj = {};
           obj = this.area.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === ev;//筛选出匹配数据
          });
           this.areaname = obj.regionName;
          }
        })
      },//镇
      getBurg(ev){
        this.$http.post("/eai/authRegion/selectDate",{
          parentId:ev,
          type:5
        }).then(res => {
          if(res === "此父区划下无子区划"){
            this.burg=[]
          }else {
            let obj = {};
           obj = this.calm.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === ev;//筛选出匹配数据
          });
           this.calmname = obj.regionName;
            if(this.value === 5){
              this.formModel.burg = ""
              this.burg = res
            }
          }
        })
      },//村
      getRegionName(ev){
        let obj = {};
           obj = this.burg.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.id === ev;//筛选出匹配数据
          });
           this.burgname = obj.regionName;
      },
      async loginup(){
        if(this.formModel.uPhone === ''){
          alert('手机号不能为空')
        }else if(this.formModel.pass === ''){
          alert('密码不能为空')
        }else if(this.formModel.phoned === ''){
          alert('验证码不能为空')
        }else if(this.formModel.id==5&&this.burgname==""){
          alert("负责区域必须选到村级")
        }else if(this.formModel.id==4&&this.calmname==""){
          alert("负责区域必须选到乡级")
        }
        else{
          let str =this.provincename+"-"+this.townname+"-"+this.areaname+"-"+this.calmname;
          str +=this.burgname==""?"":"-"+this.burgname
          let idstr = this.formModel.province +"-"+this.formModel.town+"-"+ this.formModel.area+"-"+this.formModel.calm;
          idstr +=this.formModel.burg==""?"":"-"+this.formModel.burg
         await this.$http.post("/hts/management/addAdmin",{
            phone:this.formModel.uPhone,
            pass:this.formModel.pass,
            name:this.formModel.name,
            icode:this.formModel.phoned,
            idcard:this.formModel.uCard,
            identity:this.formModel.id,
            ywNo:1,
           // territoryId:this.formModel.calm === ''? this.formModel.burg:this.formModel.calm,
            territoryId:idstr,
            territory:str
            // territory:this.territory`${this.formModel.province}-${this.formModel.town}-${this.formModel.area}-${this.formModel.calm}-${this.formModel.burg}`
          }).then(res => {
            if(res === true){
              this.logis()
              alert("注册成功")
            }
          }).
          catch(err =>{
        console.log(err)
          })
        }
      },
      reimg(){
        this.markId = new Date().getTime()
      },
      getPhone(){
        let re = /^1\d{10}$/
        if(this.formModel.uPhone === ''){
          alert('手机号不能为空')
          this.dialogVisible=false
        }else if(!re.test(this.formModel.uPhone)){
          alert('手机号格式不正确')
          this.dialogVisible=false
        }else{
          this.dialogVisible=true
        }
      },
    },
      computed:{
      changeye(){
        if(this.passwordType==""){
          return "openeye"
        }
        else{
          return "eye"
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .show-pwd{
    position: absolute;
    right: 4%;
    top: 5%;
  }
  .big{
    background: url(./login-bg.jpg) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: table;
    .main{
      display: table-cell;
      vertical-align: middle;
      padding-top: 110px;
    }
  }
  .el-form{
    width: 450px;
  }
  .app-container{
    text-align: center;
    height: 540px;
    width: 1200px;
    margin: 0 auto;
  }
  .top-header {
    height: 90px;
    left: 0;
    right: 0;
    position: absolute;
    top: 0;
    background: #fff;
    border-bottom: 1px solid #ddd;
    .header-wrap {
      width: 1200px;
      margin: 0 auto;
      background: url(./logo.png) no-repeat left 14px;
      height: 90px;
    }
  }
</style>
