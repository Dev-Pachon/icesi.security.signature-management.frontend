import {useState} from 'react'
import {App as AntApp, Layout, Menu, MenuProps} from "antd";
import {FaClipboardCheck, FaKey, FaSignature} from 'react-icons/fa';
import KeyPairs from "./pages/KeyPairs.tsx";
import SignFile from "./pages/SignFile.tsx";
import VerifySignature from "./pages/VerifySignature.tsx";

const {Header, Footer, Content} = Layout;


const items: MenuProps['items'] = [{
    label: 'Key Pairs', key: 'generate-key-pairs', icon: <FaKey/>,
}, {
    label: 'Sign File', key: 'sign-file', icon: <FaSignature/>,
}, {
    label: 'Verify Signature', key: 'verify-signature', icon: <FaClipboardCheck/>,
}];

function App() {

    const [current, setCurrent] = useState('generate-key-pairs');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <AntApp>
            <Layout>
                <Header style={{padding: 0}}>
                    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{justifyContent:"center"}}/>
                </Header>
                <Content className="site-layout" style={{padding: '50px'}}>
                    <div style={{padding: 24, minHeight: 380, background: "#FFFFFF"}}>
                        {current === 'generate-key-pairs' && <KeyPairs/>}
                        {current === 'sign-file' && <SignFile/>}
                        {current === 'verify-signature' && <VerifySignature/>}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Signature Management ©2023 Created by Giovanni, Sebastian and
                    Diego.</Footer>
            </Layout>
        </AntApp>
    )
}

export default App
