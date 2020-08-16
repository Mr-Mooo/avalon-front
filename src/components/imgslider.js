import React from "react";
import { Row, Col, Modal } from "antd";
import { Link, withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "../index.css";
import photo1 from "../img/01_home.png";
import photo2 from "../img/02_home.png";
import photo3 from "../img/03_home.png";
import photo4 from "../img/04_home.png";
import photo5 from "../img/05_home.png";
class Imgslider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openOne = () => {
    Modal.info({
      title: "阿瓦隆平台内容规范",
      maskClosable: true,
      content: (
        <div style={{ overflowY: "auto", maxHeight: 600 }}>
          <h3>一．平台内容审核标准</h3>
          <p>
            为了更好地对阿瓦隆平台内的内容进行把控与整理归纳，我们制定了一些条例，以便于向用户明确我们的审核标准。
          </p>
          <p>以下内容之中：</p>
          <p>X-部分为平台严令禁止发布的内容。</p>
          <p>
            O-部分为平台限制内容。在进行发布时，必须主动选择内容属性为“限制内容”。（“限制内容”对于未认证用户及已认证但年龄未满18周岁的用户，将会不可见。）
          </p>
          <p>1.法律与道德相关</p>
          <p>X-与我国现有法律法规相违背的内容</p>
          <p>X-没画罪犯形象、足以引起对罪犯同情或赞赏的内容</p>
          <p>X-唆使他人蔑视法律尊严的内容</p>
          <p>X-描述犯罪方法或细节，会诱发或鼓动人们模仿犯罪行为的内容</p>
          <p>X-正面肯定或诱导他人进行犯罪行为的内容</p>
          <p>X-宣扬黑社会组织的内容</p>
          <p>X-宣扬毒品及其他违禁药品的内容</p>
          <p>2.血腥与暴力相关</p>
          <p>X-宣扬、美化暴力行为的内容</p>
          <p>X-过于真实的残缺肢体、内脏描写/描绘</p>
          <p>X-引发肢体残缺的行为或场景</p>
          <p>X-过于惨烈或不人道的死亡方式及相关内容（虐杀、侮辱尸体等）</p>
          <p>O-造成出血的格斗、战斗场景</p>
          <p>O-暴力殴打、致残的情节</p>
          <p>O-不过激的死亡场景</p>
          <p>3.性内容相关</p>
          <p>X-生殖器的直接裸露</p>
          <p>X-肛门、乳房等隐私器官的直接裸露</p>
          <p>X-直接的性爱场景</p>
          <p>X-宣扬或正面肯定偷窥、猥亵、强奸女性等行为的内容</p>
          <p>
            X-一切涉及儿童性行为的内容（包括设定上实际成年，但角色依旧拥有儿童体型的内容）
          </p>
          <p>O-不露点的肢体裸露</p>
          <p>O-不露点的敏感部位触碰</p>
          <p>O-带有挑逗、性暗示意味的姿势造型</p>
          <p>O-不进行直接描述的、隐晦的性爱场景</p>
          <p>4.历史与文化相关</p>
          <p>X-任何纳粹相关的标记、符号</p>
          <p>X-宣扬邪教思想的内容</p>
          <p>X-诋毁、歪曲社会主义先进思想的内容</p>
          <p>X-歪曲民族英雄、否定英雄烈士事迹与精神的内容</p>
          <p>X-与种族歧视相关的内容</p>
          <p>X-与性别歧视相关的内容</p>
          <h3>二．平台内TAG使用规范</h3>
          <p>
            为了更好的利用TAG进行内容的整理归纳，我们制定了一些TAG的使用规范。您在阿瓦隆上进行一切内容的分享与发布，均需要按照以下规范，进行TAG的相关设置。
          </p>
          <p>
            1.您的作品时，需主动打上相关TAG（如原作名称、相关角色姓名等），以便于内容的在阿瓦隆发布归类于搜索。
          </p>
          <p>
            2.若您发布的作品含有CP向，需要明确CP之间双方的属性。以“攻”、“受”为例，您的TAG使用，需要遵循“攻”X“受”、“攻all”、“all受”的格式，以避免产生不必要的误会与争论。
          </p>
          <p>
            3.若您发布的作品涉及前文之中所提及的限制内容，您必须在发布之时，主动地选择内容属性为“限制内容”，使其对于未认证用户以及青少年用户不可见。
          </p>
          <p>
            4.若您发布的作品之中，含有部分“雷点”，您在发布时除了需要打上相关TAG之外，还需要在“内容简介”中针对内容中的“雷点”进行说明。该部分内容将会在其他用户点击展开全文时，以“阅前须知”的性质弹出，用以进行内容预警。
          </p>
          <p>
            5.对于以现实生活之中的真人作为创作原型时，您必须在发布时主动打上“纯属虚构”TAG，以避免产生不必要的争执。
          </p>
          <h3>三．平台行为准则</h3>
          <p>
            为了更好的维护平台秩序，塑造良好的同人交流环境与氛围，我们制定了一系列针对于阿瓦隆平台内的行为准侧。
          </p>
          <p>1.在阿瓦隆平台内，禁止发布恶意、低俗广告内容。</p>
          <p>2.在阿瓦隆平台内，禁止一切人身攻击与辱骂。</p>
          <p>3.在阿瓦隆平台内，禁止一切的拉踩、引战行为。</p>
          <p>
            4.在阿瓦隆平台内，禁止一切抄袭、盗图，以及未经许可的转载等行为。
          </p>
          <p>
            5.在阿瓦隆平台内，禁止一切挂人行为。如您遇到问题或是与其他用户发生纠纷，应当通过平台内的投诉途径，向我们转达。我们将以第三方的立场进行核实与判定。
          </p>
          <p>
            6.对于公开表示不欢迎以自身为原型的同人创作的人或组织，您需要尊重其意愿，主动停止一切与其人/组织相关的同人创作活动，并删除曾经发布的相关作品。同时通过有效途径告知我们，我们在进行核实确认之后，也将对相关作品不再收录。
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  openTwo = () => {
    Modal.info({
      title: "阿瓦隆用户协议",
      content: (
        <div style={{ overflowY: "auto", maxHeight: 600 }}>
          <p>
            本协议是用户（下称“用户”或“您”）与阿瓦隆之间的协议，阿瓦隆将按照本协议约定之内容为您提供服务。“阿瓦隆”是指阿瓦隆和/或其相关服务可能存在的运营关联单位。若您不同意本协议中所述任何条款或其后对协议条款的修改，请您不要使用阿瓦隆提供的相关服务。您的使用行为将视作对本协议全部条款的完全接受。请您仔细阅读本协议的全部条款与条件，尤其是协议中黑色加粗的条款
          </p>
          <p>
            如您为未成年人的，请在法定监护人的陪同下阅读和判断是否同意本协议，特别注意未成年人条款。未成年人行使和履行本协议项下的权利和义务视为已获得监护人的认可。
          </p>
          <p>1.服务说明</p>
          <p>1.1.1 阿瓦隆向您提供包括但不限于如下服务：</p>
          <p>1.1.2阿瓦隆网站 （及其他由阿瓦隆运营的任何网站）；</p>
          <p>
            1.1.3阿瓦隆直接拥有或运营的包括但不限于PC、平板、手机、电视等全部终端客户端产品；
          </p>
          <p>1.1.4阿瓦隆用户个人中心、个人空间、超赞币、积分、钱包；</p>
          <p>1.1.5阿瓦隆直接拥有或运营的服务器、网络存储空间；</p>
          <p>1.1.6阿瓦隆提供给您的各类增值服务；</p>
          <p>1.1.7阿瓦隆提供给您的其他技术和/或服务。</p>
          <p>
            1.2阿瓦隆所提供的服务，均限于在阿瓦隆平台内使用，任何以恶意破解等非法手段将阿瓦隆所提供的服务与阿瓦隆平台分离的行为，皆不属于本协议约定的由阿瓦隆提供的服务。由此引起的一切后果由行为人负责，阿瓦隆将保留依法追究行为人法律责任的权利。
          </p>
          <p>
            1.3阿瓦隆官方所公布的方式为注册、登录、下载客户端（包括但不限于iOS、Android等智能平台）、使用阿瓦隆服务的唯一合法方式，用户通过其他任何途径、任何渠道、任何方式获取的阿瓦隆服务（包括但不限于账号、积分、客户端下载等）均为非法所得，阿瓦隆概不承认其效力，且一经发现，阿瓦隆有权立即作出删除、清零、封号等处理，任何因此导致的一切不利后果均由用户自行承担。请用户妥善保管自己的账号和密码，加强密码安全性，谨防账号泄露或被盗。因用户账号被泄露或被盗而造成的任何损失，阿瓦隆不承担补偿责任。
          </p>
          <p>
            1.4用户理解并认可阿瓦隆享有如下权利，阿瓦隆行使如下权利不视为违约，用户不追究或者豁免阿瓦隆的相关法律责任：用户有权长期使用其合法获得的阿瓦隆账号及其账号下超赞币、积分、礼品等，但是用户确认其仅享有上述服务和产品的使用权，上述服务和产品，及其衍生物的所有权及知识产权均归阿瓦隆所有（用户经合法渠道取得的实体产品所有权除外）。阿瓦隆有权在法律允许的最大范围内根据实际情况自行决定收回日期，无需另行通知用户亦无需征得用户同意。
          </p>
          <p>
            1.5阿瓦隆有权提前向用户公告（包括但不限于弹出公告、网站首页公告、系统消息）以修改、替换、升级与阿瓦隆服务相关的任何软件。如果用户不同意或者不接受阿瓦隆相关软件的修改、替代、升级，请直接拒绝、停止、取消使用行为，否则视为用户同意并接受阿瓦隆相关软件的修改、替代、升级，同时该同意并接受的行为仍受本协议约束。
          </p>
          <p>
            1.6本协议所称“用户”，包括注册用户及未注册用户。凡未注册阿瓦隆的产品和/或服务的用户，自下载或安装阿瓦隆的产品和/或使用阿瓦隆的服务时即自动成为阿瓦隆的“非注册用户”。
          </p>
          <p>
            1.7特别提醒：由于阿瓦隆的产品和服务较多，为您提供的产品和服务内容也有所不同，本协议为阿瓦隆统一适用的一般性用户服务条款。针对阿瓦隆的某些特定产品/服务，阿瓦隆还将指定特定用户服务协议，以便更具体地向你阐明阿瓦隆的服务内容、服务规则等内容，您应在充分阅读并同意特定用户服务协议的全部内容后再使用该特定产品/服务。
          </p>
          <p>2用户注册</p>
          <p>
            如果您使用阿瓦隆提供的网络存储空间进行视听节目、文字、美术摄影等的上传及传播服务，您需要注册一个账号并设置密码，并确保注册信息的真实性、正确性及完整性，如果上述注册信息发生变化，您应及时更改。在完成本服务的登记程序后，您应维护账号及密码的机密安全。您应对任何人利用您的账号及密码所进行的活动完全负责，阿瓦隆无法对非法或未经您授权使用您账号及密码的行为作出甄别，因此阿瓦隆将不承担任何责任。同时您同意并承诺做到：
          </p>
          <p>
            2.1当您的账号或密码遭到未经授权的使用，或者发生任何安全问题时，您会立即有效地通知到阿瓦隆；
          </p>
          <p>2.2当您每次登录阿瓦隆或使用相关服务后，会将有关账号等安全退出；</p>
          <p>
            2.3您同意接受阿瓦隆通过电子邮件、客户端、网页或其他合法方式向您发送通知信息和其他相关信息；
          </p>
          <p>2.4您承诺不在注册、使用阿瓦隆账号从事以下行为：</p>
          <p>2.4.1故意冒用他人信息为自己注册阿瓦隆账号；</p>
          <p>2.4.2未经他人合法授权以他人名义注册阿瓦隆账号；</p>
          <p>2.4.3窃取、盗用他人的阿瓦隆账号、超赞币、积分、会员标识等；</p>
          <p>
            2.4.4使用侮辱、诽谤、色情、政治等违反法律、道德及公序良俗的词语注册阿瓦隆账号；
          </p>
          <p>
            2.4.5以非法占有阿瓦隆相关服务资源为目的，通过正当或非正当手段恶意利用网站漏洞；
          </p>
          <p>2.4.6侵犯他人合法权益的其他内容。</p>
          <p>
            2.5您在此同意，阿瓦隆有权对违反上述条款的用户作出禁止注册及/或封号的处理。
          </p>
          <p>
            2.6您了解并知悉，您可以您的阿瓦隆账号登录阿瓦隆及其关联方提供的阿瓦隆体系下全部产品。
          </p>
          <p>3阿瓦隆上的内容</p>
          <p>
            3.1阿瓦隆上的内容是指您在阿瓦隆上传、音频或其他任何形式的内容，包括但不限于图像、文字、链接等。
          </p>
          <p>
            3.2您在阿瓦隆上传或发布的作品，您保证对其享有合法的著作权或相应授权，阿瓦隆有权展示、散布及推广前述内容。
          </p>
          <p>
            3.3为提高您内容曝光量及发布效率，您同意您在阿瓦隆的账号所发布的全部内容均授权阿瓦隆以您的账号自动同步发布至阿瓦隆及/或关联公司运营的全部产品，包括客户端软件及网站。您在阿瓦隆发布、修改、删除内容的操作，均会同步到上述产品。
          </p>
          <p>
            3.4任何经由阿瓦隆提供的服务，以上传、张贴、发送电子邮件或任何其他方式传送的资讯、资料、文字、软件、音乐、音讯、照片、图形、视讯、信息或其他资料（以下简称“内容”），无论系公开还是私下传送，均由内容提供者、上传者承担责任。
          </p>
          <p>
            3.5阿瓦隆无法预先知晓并合理控制经由阿瓦隆服务上传之内容，因此，您已预知在使用阿瓦隆的服务时，可能会接触到部分令您感到不快、不适或厌恶的内容，您同意放弃由此产生的针对阿瓦隆的任何追索权。但阿瓦隆有权依法停止传输任何前述内容并采取相应处理，包括但不限于暂停您继续使用阿瓦隆的部分或全部服务，保存有关记录并向有关机关报告。
          </p>
          <p>
            3.6您需独立对自己在阿瓦隆上实施的行为承担法律责任。若您使用阿瓦隆服务的行为不符合本协议，阿瓦隆有权作出独立处理，且在无需事先通知及/或征得用户同意的情况下停用您的账号。您若在阿瓦隆上散布和传播反动、色情或其他违反国家法律、规定的信息，阿瓦隆的系统记录可能作为您违反相关法律的证据。
          </p>
          <p>4使用规则</p>
          <p>4.1用户在使用阿瓦隆服务的过程中，应遵守以下法律法规：</p>
          <p>4.1.1《中华人民共和国保守国家秘密法》</p>
          <p>4.1.2《中华人民共和国著作权法》</p>
          <p>4.1.3《中华人民共和国计算机信息系统安全保护条例》</p>
          <p>4.1.4《计算机软件保护条例》</p>
          <p>4.1.5《互联网电子公告服务管理规定》</p>
          <p>4.1.6《信息网络传播权保护条例》</p>
          <p>4.1.7《中华人民共和国网络安全法》</p>
          <p>4.1.8其他有关计算机及互联网规定的法律、法规。</p>
          <p>
            4.2在任何情况下，阿瓦隆一旦合理地认为用户的行为可能违反上述法律、法规，可以在任何时候，不经事先通知终止向该用户提供服务。
          </p>
          <p>4.3禁止用户从事以下行为：</p>
          <p>
            4.3.1制作、上传、复制、传送、传播包含任何反对宪法所确定的基本原则、危害国家安全、泄露国家秘密、颠覆国家政权、破坏国家统一、破坏民族团结、损害国家荣誉和利益、煽动民族仇恨、民族歧视、破坏民族团结、破坏国家宗教政策、宣扬邪教和封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪、侮辱或者诽谤他人，侵害他人合法权益的等法律、行政法规禁止的内容或其他令人反感的包括但不限于资讯、资料、文字、软件、音乐、照片、图形、信息或其他资料；
          </p>
          <p>4.3.2以任何方式危害未成年人；</p>
          <p>
            4.3.3冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或任何机构有关；
          </p>
          <p>
            4.3.4伪造标题或以其他方式操控识别资料，使人误认为该内容为阿瓦隆所传送；
          </p>
          <p>
            4.3.5将无权传送的内容（例如内部资料、机密资料）进行上载、张贴、发送电子邮件或以其他方式传送；
          </p>
          <p>
            4.3.6将侵犯任何人的专利、商标、著作权、商业秘密等知识产权的内容加以上载、张贴、发送电子邮件或以其他方式传送；
          </p>
          <p>
            4.3.7将广告函件、促销资料、"垃圾邮件"等，加以上载、张贴、发送电子邮件或以其他方式传送；
          </p>
          <p>4.3.8跟踪或以其他方式骚扰他人；</p>
          <p>
            4.3.9将有关干扰、破坏或限制任何计算机软件、硬件或通讯设备功能的软件病毒或其他计算机代码、档案和程序之资料，加以上载、张贴、发送电子邮件或以其他方式传送；
          </p>
          <p>
            4.3.10干扰或破坏阿瓦隆服务或与阿瓦隆服务相连的服务器和网络，或不遵守本协议之规定；
          </p>
          <p>
            4.3.11故意或非故意违反任何相关的中国法律、法规、规章、条例等其他具有法律效力的规范；
          </p>
          <p>
            4.3.12未经阿瓦隆事先明确书面许可，以任何方式（包括但不限于机器人软件、蜘蛛软件、爬虫软件等任何自动程序、脚本、软件）和任何理由自行或委托他人、协助他人获取平台的服务、内容、数据；
          </p>
          <p>
            4.3.13用户需保证其上传内容不得违反广电总局的相关规定，包括但不限于《互联网视听节目服务管理规定》（广电总局56号令）等，其上传节目应当符合法律、行政法规、部门规章的规定，上传内容不得含有以下内容：
          </p>
          <p>（1） 反对宪法确定的基本原则的；</p>
          <p>（2） 危害国家统一、主权和领土完整的；</p>
          <p>（3） 泄露国家秘密、危害国家安全或者损害国家荣誉和利益的；</p>
          <p>
            （4）
            煽动民族仇恨、民族歧视，破坏民族团结，或者侵害民族风俗、习惯的；
          </p>
          <p>（5） 扰乱社会秩序，破坏社会稳定的；</p>
          <p>（6） 诱导未成年人违法犯罪和渲染暴力、色情、赌博、恐怖活动的；</p>
          <p>（7） 侮辱或者诽谤他人，侵害公民个人隐私等他人合法权益的；</p>
          <p>（8） 危害社会公德，损害民族优秀文化传统的；</p>
          <p>（9） 有关法律、行政法规和国家规定禁止的其他内容。</p>
          <p>
            4.3.14您制作、发布、传播的内容需遵守《网络音视频信息服务管理规定》及相关法律法规规定，不得利用基于深度学习、虚拟现实等的新技术新应用制作、发布、传播虚假新闻信息等法律法规禁止的信息内容。您在发布或传播利用基于深度学习、虚拟现实等的新技术新应用制作的非真实音视频信息时，应当以显著方式予以标识，否则阿瓦隆有权对相关内容和账户采取包括但不限于增加标识、限制、封禁等措施。
          </p>
          <p>
            4.3.15如用户提供的上传内容含有以上违反政策法律法规的信息或者内容的，由用户直接承担以上导致的一切不利后果，如因此给阿瓦隆造成不利后果的，用户应负责消除影响，并且赔偿因此导致的一切损失。
          </p>
          <p>
            4.4用户不得通过任何渠道或媒体（包括但不限于自媒体等）发出“与阿瓦隆合作”、“与阿瓦隆共同出品”等任何携带“阿瓦隆”品牌的字样，如用户需宣传推广合作节目，用户只能在宣传中提及节目本身而不得提及与阿瓦隆关系或者擅自以阿瓦隆品牌进行推广，凡是用户的发稿带有“阿瓦隆”的一切宣传稿件必须通过阿瓦隆相应合作部门之书面同意，否则因此给阿瓦隆造成的一切损失用户应予以赔偿。
          </p>
          <p>4.5积分使用规则</p>
          <p>
            4.5.1若无特殊说明，用户通过使用积分服务获得的积分、兑换物品等虚拟产品，具体使用方法、期限等以阿瓦隆页面中附带的说明及用户指南或具备以上解说性质的类似官方文档为准
          </p>
          <p>
            4.5.2积分系统会因用户需求、网站策略调整、用户接受程度等因素随时进行调整，具体信息请以当时的页面说明为准。
          </p>
          <p>
            4.5.3积分系统是阿瓦隆向用户提供的免费服务，积分的使用、消耗、兑换、抽奖等行为均不提供发票或其他票据证明。
          </p>
          <p>
            4.5.4基于虚拟商品的性质和特征，阿瓦隆不提供积分兑换的虚拟商品的退货、换货服务。对于实物产品，因用户原因导致产品出现瑕疵、损坏的，阿瓦隆不予负责。
          </p>
          <p>
            4.5.5除非得到阿瓦隆的书面授权，用户不得将积分服务及积分用于商业领域，包括但不限于买卖、置换、抵押或以特定方式使用积分服务获取不当得利等。任何用户都应通过正规渠道获得积分服务，一切通过非官方公布渠道取得的积分及其衍生服务均不对阿瓦隆发生法律效力，阿瓦隆有权单方面收回相关积分并终止相应服务，严重者阿瓦隆有权对其用户采取封号处理。
          </p>
          <p>
            4.5.6如无特殊约定，用户通过正规渠道获得的积分及其衍生物品均不以任何现金方式退还，仅能通过享用积分服务进行等值消耗。用户消耗其所获得全部积分，且不将继续使用积分服务的，服务终止。
          </p>
          <p>5第三方链接</p>
          <p>
            阿瓦隆服务可能会提供与其他国际互联网网站或资源进行链接。除非另有声明，阿瓦隆无法对第三方网站之服务进行控制，用户因使用或依赖上述网站或资源所产生的损失或损害，阿瓦隆不承担任何责任。我们建议您在离开阿瓦隆，访问其他网站或资源前仔细阅读其服务条款和隐私政策。
          </p>
          <p>6知识产权</p>
          <p>
            6.1受国际版权公约、中华人民共和国著作权法、专利法、及其他知识产权方面的法律法规的保护，阿瓦隆服务及本服务所使用的软件、技术、商标、材料等的所有知识产权归阿瓦隆所有和享有。“知识产权”包括在专利法、版权法、商标法、反不正当竞争法中等法律规定的任何和所有权利、任何和所有其它所有权以及其中的任何和所有应用、更新、扩展和恢复。
          </p>
          <p>
            6.2用户不得修改、改编、翻译阿瓦隆服务所使用的软件、技术、材料等，或者创作与之相关的派生作品，不得通过反向工程、反编译、反汇编或其他类似行为获得其的源代码，否则由此引起的一切法律后果由用户负责，阿瓦隆将依法追究违约方的法律责任。
          </p>
          <p>
            6.3用户不得恶意修改、复制、传播阿瓦隆服务所使用的软件、技术、材料等。否则，用户自行承担因此而造成对其他人的损害，或者造成对阿瓦隆公司形象损害，要承担相应的法律责任。
          </p>
          <p>
            6.4用户不得擅自删除、掩盖或更改阿瓦隆的版权声明、商标或其它权利声明。阿瓦隆平台所有设计图样以及其他图样、产品及服务名称，均为阿瓦隆及/或其关联公司所享有的商标、标识。任何人不得使用、复制或用作其他用途。
          </p>
          <p>
            6.5阿瓦隆对其自制内容和其他通过授权取得的独占内容享有完全知识产权，未经阿瓦隆许可，任何单位和个人不得私自转载、传播和提供观看服务或者有其他侵犯阿瓦隆知识产权的行为。否则，阿瓦隆将追究侵权行为人的法律责任。
          </p>
          <p>
            6.6阿瓦隆所有和享有的知识产权，不因用户的任何使用行为而发生权利转移。
          </p>
          <p>7免责声明</p>
          <p>
            阿瓦隆对于任何包含、经由或连接、下载或从任何与有关本网络服务所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本服务上的广告、展示而购买、取得的任何产品、信息或资料，阿瓦隆不负保证责任。用户自行负担使用本服务的风险
          </p>
          <p>
            7.2除非另有明确的书面说明，阿瓦隆提供给您的全部产品和服务，均是在“按现状”和“按现有”的基础上提供的。
          </p>
          <p>7.3阿瓦隆对如下事项不做担保（包括但不限于）：</p>
          <p>
            7.3.1阿瓦隆提供的网站、客户端等软件虽然均已经过阿瓦隆测试，但由于技术本身的局限性，阿瓦隆不能保证其与其他软硬件、系统完全兼容。如果出现不兼容的情况，用户可将情况报告阿瓦隆，以获得技术支持。如果无法解决问题，用户可以选择卸载、停止使用阿瓦隆服务。
          </p>
          <p>
            7.3.2使用阿瓦隆服务涉及到Internet服务，可能会受到各个环节不稳定因素的影响。因不可抗力、黑客攻击、系统不稳定、网络中断、用户关机、通信线路等原因，均可能造成阿瓦隆服务中断或不能满足用户要求的情况。阿瓦隆不保证阿瓦隆服务适合用户的使用要求。
          </p>
          <p>
            7.3.3由于阿瓦隆提供的客户端等软件可以通过网络途径下载、传播，因此对于从非阿瓦隆指定官方站点下载、非阿瓦隆指定途径获得的阿瓦隆服务相关软件，阿瓦隆无法保证其是否感染计算机病毒、是否隐藏有伪装的木马程序等黑客软件，也不承担用户由此遭受的一切直接或间接损害赔偿等法律责任。
          </p>
          <p>
            7.3.4阿瓦隆不做任何与阿瓦隆服务、产品的安全性、可靠性、及时性和性能有关的担保。
          </p>
          <p>
            7.3.5阿瓦隆不保证其提供的任何产品、服务或其他材料符合用户的期望。
          </p>
          <p>
            7.4用户使用经由阿瓦隆服务下载或取得的任何资料，其风险由用户自行负担，因该使用而导致用户电脑系统损坏或资料流失，用户应负完全责任。
          </p>
          <p>
            7.5基于以下原因而造成的利润、商业信誉、资料损失或其他有形或无形损失，阿瓦隆不承担任何直接、间接、附带、衍生或惩罚性的赔偿：
          </p>
          <p>7.5.1阿瓦隆服务全部或部分无法使用；</p>
          <p>7.5.2经由阿瓦隆服务购买或取得的任何产品、资料或服务；</p>
          <p>7.5.3用户资料遭到未授权的使用或修改；</p>
          <p>7.5.4其他与阿瓦隆服务相关的事宜。</p>
          <p>
            7.6用户应妥善保管自己的账号和密码，加强密码安全性，谨防账号泄露或被盗。因用户账号被泄露或被盗而造成的任何损失，阿瓦隆不承担补偿责任。用户因电信和网通部门的通讯线路故障、网络或电脑故障、系统不稳定、不可抗力（如服务器宕机）等非阿瓦隆原因造成账号、账号内财产等丢失、减少的，阿瓦隆不承担补偿等责任。
          </p>
          <p>
            7.7用户理解并同意自主选择免费下载和使用阿瓦隆服务，风险自负，包括但不限于用户使用阿瓦隆服务过程中的行为，以及因使用阿瓦隆服务产生的一切后果。如因下载或使用阿瓦隆服务而对计算机系统造成的损坏或数据的丢失等，用户须自行承担全部责任。
          </p>
          <p>
            7.8用户因认证信息不真实而导致账号、账号内财产等丢失、减少而无法找回的，阿瓦隆不承担任何法律责任。
          </p>
          <p>8服务的变更、中断、终止</p>
          <p>
            8.1您理解并同意，阿瓦隆基于经营策略的调整，可能会对服务内容进行变更，也可能会中断、中止或终止服务。
          </p>
          <p>
            8.2您理解并同意，如阿瓦隆发生合并、分立、收购、资产转让时，阿瓦隆可向第三方转让本服务下相关资产；阿瓦隆亦可在单方通知您后，将本协议下部分或全部服务及相应的权利义务转交由第三方运营或履行。
          </p>
          <p>
            8.3您理解并同意，如您违反相关法律法规的规定、违反本协议及其他阿瓦隆平台约定，阿瓦隆有权不经通知而单方中断或终止向您提供服务。
          </p>
          <p>
            8.4阿瓦隆终止向您提供服务后，有权根据适用法律的要求删除您的个人信息，或使其匿名化处理，亦有权依照法律规定的期限和方式继续保存您留存于我方平台的其他内容和信息。
          </p>
          <p>9注销</p>
          <p>
            9.1用户有权向阿瓦隆提出账号注销申请，您可以通过联系阿瓦隆客服注销您的账号（但相关法律法规另有规定的或本协议及各站内规则另有约定的除外）。
          </p>
          <p>
            9.2特别提醒：注销阿瓦隆账号后，您将无法再以此账号登录和使用阿瓦隆及其关联公司的所有产品与服务以及产品及服务中与第三方合作的服务内容，阿瓦隆也将同时终止在该账号下为您提供我们各项产品与服务，这同时也不可避免地会给您的售后维权带来不便。且阿瓦隆账号一旦注销完成，将无法恢复。请您在注销前慎重考虑。
          </p>
          <p>
            9.3如您确定需要注销阿瓦隆账号的，您已充分知晓并确认，账号注销后该UID仍然存在，但您将不再拥有账号相关的权益，包括但不限于：
          </p>
          <p>
            9.3.1账号注销后，您将无法再以该账号登录、使用阿瓦隆旗下的全部产品和服务；
          </p>
          <p>
            9.3.2账号注销后，您曾通过该账号登录、使用阿瓦隆旗下的全部产品和服务的所有内容、信息、数据、记录将会被删除或匿名化处理，您也无法再搜索、访问、获取、使用和找回，包括但不限于：账号信息（头像、昵称、签名等）、绑定信息；
          </p>
          <p>9.3.3账号注销后，该账号的交易记录将被清空且无法恢复；</p>
          <p>9.3.4账号注销后，阿瓦隆有权不再为用户提供任何与账号有关的服务；</p>
          <p>
            9.3.5您同意通过账号注销的方式放弃该账号在阿瓦隆旗下的产品与服务使用期间已产生但未消耗完毕的权益及未来的预期利益。阿瓦隆将对该账号下的全部权益做清除处理，包括但不限于：您尚未到期的大会员权益、您尚未使用的各类优惠券、您游戏角色下的虚拟货币和道具、您在阿瓦隆各产品和/或服务中的各类身份权益、您在阿瓦隆各产品和/或服务中已经购买的未到期的在线服务内容、其他已经产生但未消耗完毕的权益或未来预期的利益。
          </p>
          <p>
            9.4在您向我们申请注销阿瓦隆账号之前，为了保护您的账号安全和财产权益，您需先行检查与确保您申请注销的账号已经同时满足以下条件，包括但不限于：
          </p>
          <p>
            9.4.1账号系用户通过官方渠道注册，符合本协议及相关规定的账号；且为您本人的会员账号；
          </p>
          <p>9.4.2按照客服要求的注销流程进行注销操作；</p>
          <p>
            9.4.3账号处于安全状态，包括：未处于申请找密码、修改手机号的状态中；无未处理完毕的（被）投诉、举报；其他不安全/异常状态；
          </p>
          <p>9.4.4账号内无未处理完毕的交易；</p>
          <p>9.4.5账号内无您发起的但尚未完成的抽奖活动；</p>
          <p>
            9.4.6该账号账号与阿瓦隆全部业务都不存在合约关系或尚在合约期的（如签约主播等）；
          </p>
          <p>
            9.4.7如该账号曾开通了“连续包月/包季/包年”服务的，您已经自行取消该服务；
          </p>
          <p>9.4.8其他应满足的条件。</p>
          <p>
            9.5如您已充分阅读并理解9.2和9.3条的内容，并确认已经满足9.4条的全部条件，可以向客服提出账号注销申请。客服将对您的账号安全状态以及您的相关产品与服务的使用情况等进行审核，综合判断您的账号是否符合条件。
          </p>
          <p>
            9.6阿瓦隆账号一旦注销，您与我们曾签署过的相关用户协议、其他权利义务性文件等相应终止（但已约定继续生效的或法律另有规定的除外）。同时，您知悉并同意：即使您的账号被注销了，也并不减轻或免除您在协议期间内应根据相关法律法规、相关协议、规则等（可能）需要承担的相关责任。
          </p>
          <p>10隐私政策</p>
          <p>
            10.1阿瓦隆注重保护用户的个人信息及个人隐私。个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。您在下载、安装、启动、浏览、注册、登录、使用阿瓦隆的产品与/或服务时，阿瓦隆将按照平台公布的《阿瓦隆隐私政策》的约定处理和保护您的个人信息，因此希望您能够仔细阅读、充分理解《阿瓦隆隐私政策》的全文，并在需要时，按照《阿瓦隆隐私政策》的指引，作出您认为适当的选择。
          </p>
          <p>
            您应当在仔细阅读、充分理解《阿瓦隆隐私政策》后使用阿瓦隆的产品与/或服务，如果您不同意政策的内容，将可能导致阿瓦隆的产品与/或服务无法正常运行，或者无法达到阿瓦隆拟达到的服务效果。您使用或继续使用阿瓦隆提供的产品与/或服务的行为，都表示您充分理解和同意《阿瓦隆隐私政策》（包括更新版本）的全部内容
          </p>
          <p>
            10.3如您对《阿瓦隆隐私政策》或对您的个人信息相关内容有任何问题（包括问题咨询、投诉等），您可通过《阿瓦隆隐私政策》第十条公布的联系方式联系我们。
          </p>
          <p>11未成年人条款</p>
          <p>
            11.1阿瓦隆非常注重未成年人的保护。若您为未成年人，应在监护人监护、指导下阅读本协议，并在取得监护人的同意后使用阿瓦隆的产品与/或服务。
          </p>
          <p>
            11.2监护人应指导子女上网应该注意的安全问题，防患于未然。阿瓦隆不鼓励未成年人使用阿瓦隆的产品/服务进行任何消费行为，如有消费，未成年人应请监护人操作或在监护人明示同意下操作。
          </p>
          <p>
            11.3对于未成年人的隐私保护，阿瓦隆将严格按照平台公布的《阿瓦隆隐私政策》中阐述的方式、方法执行。
          </p>
          <p>12法律适用和管辖</p>
          <p>
            12.1本协议的生效、履行、解释及争议的解决均适用中华人民共和国法律。本条款因与中华人民共和国现行法律相抵触而导致部分无效，不影响其他部分的效力。双方同意，解决争议时，应以您同意的最新版《阿瓦隆弹幕网用户使用协议》为准。
          </p>
          <p>
            12.2如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，则争议各方均一致同意将争议提交广州仲裁委员会按照其仲裁规则进行仲裁。仲裁裁决为一裁终局，对各方均有法律约束力。
          </p>
          <p>13协议的修改与通知</p>
          <p>
            13.1阿瓦隆有权依据国家政策、技术条件、产品功能等变化需要而对本协议进行修改并将修改后的协议予以发布。
          </p>
          <p>
            13.2前述内容一经正式发布，阿瓦隆将以适当的方式（包括但不限于弹窗、邮件、站内信、网站公告等）提醒您更新的内容，以便您及时了解本协议的最新版本。
          </p>
          <p>
            13.3您知悉，本协议的名称、各章节标题仅为方便及阅读而设，且因本协议在我们平台展示之处较多，全部协议更名完毕可能需要一段时间，在此期间内，两个名称的同时存在并不影响正文其中任何条款的含义或解释。
          </p>
          <p>
            13.4修改后的内容将构成本协议不可分割的组成部分，您应同样遵守。您对修改后的协议有异议的，请立即停止登录、使用阿瓦隆及相关服务，若您登录或继续使用阿瓦隆及相关服务，则视为您已充分阅读、理解并接受更新后的本协议并愿意受更新后的本协议的约束。
          </p>
        </div>
      ),
      onOk() {},
      maskClosable: true,
    });
  };
  openThree = () => {
    Modal.info({
      title: "平台禁言/封号须知",
      maskClosable: true,
      content: (
        <div style={{ overflowY: "auto", maxHeight: 600 }}>
          <p>
            以下内容请您仔细阅读并遵守，如在日后的平台使用过程中有违反情况，在我们核实确有其事之后，将有权对您的账号进行处罚。视情况的严重程度，会处以不同期限的禁言、封停惩罚，最高可至永久期限。
          </p>
          <p>
            需要注意的是，此公约并非一成不变，在平台今后的运营之中，我们将可能会根据实际情况，做出调整与补充。届时将会同步进行平台内的公告，还请务必关注，否则由此产生的一切后果，均需自负。
          </p>
          <p>
            一、您的以下行为，将会导致不同期限的账号禁言处罚。屡教不改或情节极为恶劣者，最高将会处以账号永久禁言：
          </p>
          <p>
            1.发布违反我国法律法规，或诋毁、歪曲社会主义先进思想的言论，将直接处以账号永久禁言。
          </p>
          <p>
            2.发布歪曲民族英雄、否定英雄烈士事迹与精神的言论，将直接处以账号永久禁言。
          </p>
          <p>
            3.发布带有极端宗教思想的言论，将处以30天起步、最高可至永久的账号禁言惩罚。
          </p>
          <p>
            4.发布带有歧视（包括但不限于：种族歧视、性别歧视、国籍歧视、地域歧视等）思想的言论，将处以15天起步、最高可至永久的账号禁言惩罚。
          </p>
          <p>
            5.发布谣言或未经核实的虚假内容，引起平台内其他用户愤怒、恐慌等负面情绪的行为，将处以15天起步、最高可至永久的账号禁言惩罚。
          </p>
          <p>
            6.于平台内向其他用户进行人身攻击、恶意辱骂的行为，将处以7天起步、最高可至永久的账号禁言惩罚。
          </p>
          <p>
            7.发布含有拉踩、引战信息的内容，或试图主动挑起用户之间的派别对立、撕逼骂战的言论，将处以7天起步、最高可至永久的账号禁言惩罚。
          </p>
          <p>
            二、您的以下行为，将会导致不同期限的账号封禁处罚。屡教不改或情节极为恶劣者，最高将会处以账号永久封禁：
          </p>
          <p>
            1.盗用他人信息进行账号注册与认证，一经发现并核实后，将直接处以账号永久封禁。
          </p>
          <p>
            2.利用第三方程序或系统漏洞，篡改账号数据（如平台内的货币、积分等），将直接处以账号永久封禁。
          </p>
          <p>
            3.于平台内向其他用户进行威胁、勒索、诈骗，并造成他人实质性损失的行为，将直接处以账号永久封禁。
          </p>
          <p>
            4.于平台内发布平台禁止的、违反平台相关法律法规的内容（具体内容详见《阿瓦隆平台内容规范》、《平台相关法律法规》），将视情况处以30天起步、最高可至永久的账号封禁。
          </p>
          <p>
            5.于平台内发布恶意低俗广告或违法链接，将视情况处以15天起步、最高可至永久的账号封禁。
          </p>
          <p>
            6.未按照平台规定的要求，发布平台限制内容（具体内容详见《阿瓦隆平台内容规范》），并在平台内导致造成了不良影响，且不听劝说我行我素的行为，将视情况处以7天起步、最高可至永久的账号封禁。
          </p>
          <p>
            7.平台内设立的投诉功能，意在建立更好的规则与秩序，而非用以攻击中伤的武器。若有滥用投诉对他人造成困扰，且屡教不改的，将视情况处以7天起步、最高可至永久的账号封禁。
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  openFour = () => {
    Modal.info({
      title: "平台功能简介",
      maskClosable: true,
      width: 500,
      content: (
        <div style={{ overflowY: "auto", maxHeight: 600 }}>
          <p>
            在这里，我们将会对于阿瓦隆内部的一些服务与制度，做一些简单的介绍，以便于您更好的使用。
          </p>
          <p>阿瓦隆为您提供的服务：</p>
          <p>1.“一人、一证、一号”的会员实名服务</p>
          <p>
            我们希望阿瓦隆所带来的，是纯净、高质量的平台环境与氛围。因此我们将在平台推行实名认证。
          </p>
          <p>
            （我们将会根据国家相关法律法规，保护用户的身份信息，个人隐私等不受泄露）。
          </p>
          <p>我们秉持自愿的原则，对实名认证不强制要求。</p>
          <p>
            但未认证的用户，以及经过认证但年龄未满18周岁的用户，将会受到一些限制。具体限制内容详见下文。
          </p>
          <p>2.拒绝一刀切的内容分级制度</p>
          <p>
            作为一个内容平台，我们以“中立秩序”的立场，以及“法无明文规定不为罪，法无明文规定不处罚”的原则，允许一切不违反我国法律法规的创作内容，支持并捍卫创作者们在阿瓦隆平台内，对于自己作品的发布权利。
          </p>
          <p>
            但出于对与青少年人群的保护目的，我们对于未认证的用户，以及经过认证但年龄未满18周岁的用户，我们将会在普通模式之下，对于部分内容与功能进行限制（即类似其他内容平台的“青少年模式”）。
          </p>
          <p>
            在普通模式下，您任然可以正常享受阿瓦隆的服务，但部分作品内容将不可见，且不提供任何的充值以及购买增值服务。
          </p>
          <p>
            而经过实名认证的用户，认证年满18周岁，才可以进行充值与购买增值服务操作。
          </p>
          <p>
            与普通模式对应的会员模式，是我们的增值服务之一。会员模式除必须实名认证外，需要支付18元/月的费用。开启会员模式后，您可以享受阿瓦隆所提供的一切内容与服务。
          </p>
          <p>附-用户属性与对应权限一览表：</p>
          <p>
            <table>
              <thead>
                <tr>
                  <th>用户属性</th>
                  <th>权限-浏览平台内全部内容</th>
                  <th>权限-充值与购买其他增值服务</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>未认证用户</td>
                  <td>X</td>
                  <td>X</td>
                </tr>
                <tr>
                  <td>认证但未满18周岁用户</td>
                  <td>X</td>
                  <td>X</td>
                </tr>
                <tr>
                  <td>认证满18周岁，未开启会员模式</td>
                  <td>√</td>
                  <td>√</td>
                </tr>
                <tr>
                  <td>认证满18周岁，且开启会员模式</td>
                  <td>√</td>
                  <td>√</td>
                </tr>
              </tbody>
            </table>
          </p>
          <p>3.阿瓦隆特有的全新增值服务——“超赞”</p>
          <p>
            现在许多的平台，存在例如“打赏”或“付费解锁”的功能。但两种功能的片面性和局限性引发我们对当下格局的思考与改变：
          </p>
          <p>
            将同人创作，尤其是二创作品赋予商品意义，同时因此获得利益，非常容易引产生版权方面的问题，为创作者带来麻烦。这样的模式偏离了同人“不以盈利为目的，而出于个人兴趣而进行作品创作”的初衷。
          </p>
          <p>
            因此，我们针对同人圈层的特性，定制了一项全新的增值服务——“超赞”。
          </p>
          <p>
            我们深度挖掘了“打赏”背后的意义——愿意为了自己喜欢的作品而付费，这一行为本身所表达的核心意义，是认可。
          </p>
          <p>
            综上所述，我们放弃“打赏”或是“付费解锁”的模式，而是将“认可”的这一概念进行放大，即：通过点亮超赞的行为，让创作者感受到支持与认可，同时在平台内，为这一作品带来更高的热度。
          </p>
          <p>
            点亮“超赞”需要消耗平台内道具“超赞币”，每一枚“超赞币”单价为3元，对于同一作品每人仅可点亮一次，所带来的作品热度为普通点赞的10倍
          </p>
          <p>
            我们承诺会将“会员模式”和“超赞币”的收益，投入平台的不断完善和建设，为所有创作者提供更健全的服务和更优化的环境。出于平台保护的目的，我们无法公开所有的功能细节，在此为您简单介绍。
          </p>
          <p>目前已经在规划之中的服务有：</p>
          <p>1.能够获取实际收益的相关服务</p>
          <p>
            虽然我们认为打赏的核心意义在于认可，但依靠自己的创作而谋生的全职创作者，依旧有不少。对于希望能够得到实际收益的全职创作者们，我们后续将会有配套的功能模块上线，并且将会比打赏收益更为直接、高效。
          </p>
          <p>2.对于内容的保护与评判服务</p>
          <p>
            对于抄袭、盗图等现象，我们报以零容忍的态度，但若有“误伤”发生，对于创作者来说也是一种非常大的伤害。因此对于内容保护方面，我们将会在中后期，上线更为专业、权威的评判服务，来维护创作者所应享受的权利。
          </p>
          <p>
            更多的服务还在陆续的筹备之中，我们也希望能够听到更多人的意见和建议，来共同搭建这个同人圈的阿瓦隆。如果您有什么希望实现的功能与服务，可以在内测开启一周（7月4日）后开放的内测问卷之中，告诉我们您的想法。
            阿瓦隆，我们期待听到您的声音。
          </p>
          <p>此致</p>
          <p>2020年06月28日</p>
        </div>
      ),
      onOk() {},
    });
  };
  render() {
    return (
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <img
            className="carousel-image"
            style={{ height: "454px" }}
            alt="img1"
            onClick={() => this.openOne()}
            /* src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
            src={photo1}
          />
          {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片...</div> */}
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Row gutter={[8, 8]}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <img
                className="carousel-image"
                alt="img1"
                onClick={() => this.openTwo()}
                /* src="https://images.unsplash.com/photo-1590604963420-b8085dca6a75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80" */
                src={photo2}
              />
              {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <img
                className="carousel-image"
                alt="img1"
                onClick={() => this.openThree()}
                /* src="https://images.unsplash.com/photo-1590632876315-46166b963f48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
                src={photo3}
              />
              {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
            </Col>
          </Row>

          <Row gutter={[8, 8]}>
            <Col xs={12} sm={12} md={12} lg={12}>
              <img
                className="carousel-image"
                alt="img1"
                onClick={() => this.openFour()}
                /* src="https://images.unsplash.com/photo-1590457226842-da02b74c5ff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" */
                src={photo4}
              />
              {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
            </Col>

            <Col xs={12} sm={12} md={12} lg={12}>
              <a href="https://www.wenjuan.com/s/zm6fem/" target="_blank">
                <img
                  className="carousel-image"
                  alt="img1"
                  /* src="https://images.unsplash.com/photo-1525230071276-4a87f42f469e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" */
                  src={photo5}
                />
              </a>
              {/* <div className="img-caption">图片说明：图片说明图片说明图片说明图片...</div> */}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default withRouter(Imgslider);
