import {App, Button, Col, Form, Input, Row, Space, Typography} from "antd";
import {useState} from "react";
import {FaDownload} from "react-icons/fa";
import client from "../utils/axios.ts";
import {AxiosResponse} from "axios";

type FieldType = {
    password?: string;
}

type responseType = {
    clave_publica: string;
    clave_privada: string;
    mensaje: string;
}


export const KeyPairs = () => {
    const {message} = App.useApp();
    const [form] = Form.useForm();
    const [privateKey, setPrivateKey] = useState<string>('none')
    const [publicKey, setPublicKey] = useState<string>('none')
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: FieldType) => {
        setLoading(true)
        const bodyFormData = new FormData();
        bodyFormData.append('password', values.password!);
        client.post('/generar_claves', bodyFormData, {headers: {"Content-Type": "multipart/form-data"}}).then((res: AxiosResponse<responseType>) => {
            setPrivateKey(res.data.clave_privada)
            setPublicKey(res.data.clave_publica)
            message.success(res.data.mensaje);
            setLoading(false)
        }).catch((err) => {
            message.error(err?.response?.data?.error)
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onDownloadPrivateKey = () => {
        if (privateKey !== 'none') {
            const a = document.createElement('a');
            a.download = 'private_key.pem';
            const file = new Blob([privateKey], {type: 'text/plain', endings: 'native'});
            a.href = URL.createObjectURL(file);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }

    const onDownloadPublicKey = () => {
        if (publicKey !== 'none') {
            console.log(publicKey)
            const a = document.createElement('a');
            a.download = 'public_key.pem';
            const file = new Blob([publicKey], {type: 'text/plain', endings: 'native'});
            a.href = URL.createObjectURL(file);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }


    return (<Space direction={"vertical"} style={{display: "flex"}}>
        <Typography.Title level={1} style={{textAlign: "center"}}>Generate Key Pairs</Typography.Title>
        <Row justify="space-around" align="middle">
            <Col xs={24} md={5}><Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={"optional"}
            >
                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}, {
                        min: 8,
                        message: 'Password must be at least 8 characters long'
                    }]}
                >
                    <Input.Password placeholder="input password"/>
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="password2"
                    dependencies={['password']}
                    rules={[{
                        required: true, message: 'Please confirm your password!',
                    }, ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),]}
                >
                    <Input.Password placeholder="Confirm your password"/>
                </Form.Item>

                <Form.Item style={{textAlign: "right"}}>
                    <Button type="primary" shape="round" htmlType="submit" loading={loading}>
                        Generate
                    </Button>
                </Form.Item>

            </Form></Col>
            <Col xs={24} md={4} style={{textAlign: "center"}}>
                <Space direction={"vertical"} size={"middle"}>

                    <Space direction={"vertical"}>

                        <Typography.Text strong>Private Key</Typography.Text>

                        <Button type="primary" shape="round" icon={<FaDownload/>} onClick={onDownloadPrivateKey}
                                disabled={privateKey === "none"}>
                            Download private key
                        </Button>
                    </Space>

                    <Space direction={"vertical"}>
                        <Typography.Text strong>Public Key</Typography.Text>

                        <Button type="primary" shape="round" icon={<FaDownload/>} onClick={onDownloadPublicKey}
                                disabled={publicKey === "none"}>
                            Download public key
                        </Button>
                    </Space>
                </Space>
            </Col>
            <Col xs={0} md={5}>
                <Typography.Paragraph italic>
                    Asymmetric cryptography is a branch of cryptography where a secret key can be divided into two
                    parts, a public key and a private key. The public key can be given to anyone, trusted or not, while
                    the private key must be kept secret (just like the key in symmetric cryptography).
                </Typography.Paragraph>
            </Col>
        </Row>
    </Space>)
}

export default KeyPairs;