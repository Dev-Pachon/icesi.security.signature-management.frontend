import {App, Button, Col, Form, Input, Row, Space, Typography, Upload} from "antd";
import {useState} from "react";
import {FaDownload, FaUpload} from "react-icons/fa";
import client from "../utils/axios.ts";
import {AxiosError, AxiosResponse} from "axios";
import {UploadFile} from "antd/lib";


type SignFormType = {
    password: string;
    file: {
        file: UploadFile
    };
    privateKey: {
        file: UploadFile
    };
}

type responseType = {
    firma: string;
    mensaje: string;
}


export const SignFile = () => {
    const {message} = App.useApp();
    const [form] = Form.useForm();
    const [signature, setSignature] = useState<string>('none')
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: SignFormType) => {
        setLoading(true)

        console.log(values)

        const bodyFormData = new FormData();
        bodyFormData.append('password', values.password);

        bodyFormData.append('archivo', values.file.file.originFileObj!);
        bodyFormData.append('clave_privada', values.privateKey.file.originFileObj!);
        client.post('/firmar', bodyFormData, {headers: {"Content-Type": "multipart/form-data"}}).then((res: AxiosResponse<responseType>) => {
            setSignature(res.data.firma)
            message.success(res.data.mensaje);
            form.resetFields()
            setLoading(false)
        }).catch((err: AxiosError<{ error: string }>) => {
            form.setFieldValue("password", "")
            message.error(err?.response?.data?.error)
            setLoading(false)
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onDownloadPrivateKey = () => {
        if (signature !== 'none') {
            const a = document.createElement('a');
            a.download = 'signature.pem';
            const file = new Blob([signature], {type: 'text/plain', endings: 'native'});
            a.href = URL.createObjectURL(file);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }


    return (<Space direction={"vertical"} style={{display: "flex"}}>
        <Typography.Title level={1} style={{textAlign: "center"}}>Sign a file</Typography.Title>
        <Row justify="space-around" align="middle">
            <Col xs={24} md={10}><Form
                form={form}
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={"optional"}
            >
                <Form.Item<SignFormType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}, {
                        min: 8,
                        message: 'Password must be at least 8 characters long'
                    }]}
                >
                    <Input.Password placeholder="input password"/>
                </Form.Item>
                <Row gutter={16}>
                    <Col md={12}>
                        <Form.Item
                            name={"file"}
                            label={"File to sign"}
                            rules={[{required: true, message: "Please upload a file to be signed"}]}
                            valuePropName={"file"}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture"
                                multiple={false}
                                maxCount={1}
                            >
                                <Button icon={<FaUpload/>}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col md={12}>
                        <Form.Item
                            name={"privateKey"}
                            label={"Private key"}
                            rules={[{required: true, message: "Please upload your private key to sign the file"}]}
                            valuePropName={"file"}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture"
                                multiple={false}
                                maxCount={1}
                            >
                                <Button icon={<FaUpload/>}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item style={{textAlign: "right"}}>
                    <Button type="primary" shape="round" htmlType="submit" loading={loading}>
                        Sign file
                    </Button>
                </Form.Item>

            </Form></Col>
            <Col xs={24} md={10} style={{textAlign: "center"}}>

                <Typography.Paragraph italic>
                    Asymmetric encryption also enabled the concept of digital signatures. If, instead of using a private
                    key for encryption it is instead used for message authentication, one can sign a message.
                </Typography.Paragraph>
                <Space direction={"vertical"} size={"middle"}>
                    <Typography.Text strong>Signature file</Typography.Text>

                    <Button type="primary" shape="round" icon={<FaDownload/>} onClick={onDownloadPrivateKey}
                            disabled={signature === "none"}>
                        Download signature file
                    </Button>
                </Space>
            </Col>
        </Row>
    </Space>)
}

export default SignFile;