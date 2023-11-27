import {App, Button, Col, Form, Row, Space, Typography, Upload, Image} from "antd";
import {useState} from "react";
import {FaUpload} from "react-icons/fa";
import client from "../utils/axios.ts";
import {AxiosError, AxiosResponse} from "axios";
import {UploadFile} from "antd/lib";
import {AiFillSecurityScan} from "react-icons/ai";

const images = {
    neutral: "/incognita.png",
    green: "/incognita_green.png",
    red: "/incognita_red.png"
}

type SignFormType = {
    originalFile: {
        file: UploadFile
    },
    signature: {
        file: UploadFile
    };
    publicKey: {
        file: UploadFile
    };
}

type responseType = {
    mensaje: string;
}


export const VerifySignature = () => {
    const {message} = App.useApp();
    const [form] = Form.useForm();
    const [response, setResponse] = useState<string>("")
    const [imageSrc, setImageSrc] = useState<string>(images.neutral)
    const [loading, setLoading] = useState<boolean>(false)

    const onFinish = (values: SignFormType) => {
        setLoading(true)
        const bodyFormData = new FormData();
        bodyFormData.append('firma', values.signature.file.originFileObj!);
        bodyFormData.append('archivo_original', values.originalFile.file.originFileObj!);
        bodyFormData.append('clave_publica', values.publicKey.file.originFileObj!);
        client.post('/verificar_firma', bodyFormData, {headers: {"Content-Type": "multipart/form-data"}}).then((res: AxiosResponse<responseType>) => {
            setResponse(res.data.mensaje)
            message.success(res.data.mensaje);
            setImageSrc(images.green)
            form.resetFields()
            setLoading(false)
        }).catch((err: AxiosError<{ error: string }>) => {
            setImageSrc(images.red)
            message.error(err?.response?.data?.error)
            setResponse(err?.response?.data?.error|| "error")
            setLoading(false)
        })
    }


    return (<Space direction={"vertical"} style={{display: "flex"}}>
        <Typography.Title level={1} style={{textAlign: "center"}}>Verify a signature</Typography.Title>
        <Form
            form={form}
            layout={"vertical"}
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={"optional"}
            style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}
        >
            <Row gutter={16} style={{justifyContent: "space-evenly", padding: "48px"}}>
                <Col md={6}>
                    <Space direction={"vertical"} size={"small"} style={{display: "flex"}}>
                        <Form.Item
                            name={"originalFile"}
                            label={"Original file"}
                            rules={[{required: true, message: "Please upload the original file"}]}
                            valuePropName={"file"}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                multiple={false}
                                maxCount={1}
                            >
                                <Button icon={<FaUpload/>}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name={"signature"}
                            label={"Signature"}
                            rules={[{required: true, message: "Please upload the signature file"}]}
                            valuePropName={"file"}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                multiple={false}
                                maxCount={1}
                            >
                                <Button icon={<FaUpload/>}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name={"publicKey"}
                            label={"Public key"}
                            rules={[{required: true, message: "Please upload your public key to verify the file"}]}
                            valuePropName={"file"}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                multiple={false}
                                maxCount={1}
                            >
                                <Button icon={<FaUpload/>}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Space>
                </Col>
                <Col style={{alignSelf: "center"}}>
                    <Button type="primary" shape="round" htmlType="submit" loading={loading}
                            icon={<AiFillSecurityScan/>}>
                        Verify signature
                    </Button>
                </Col>

                <Col style={{textAlign: "center"}}>
                    <Space direction={"vertical"}>
                        <Image
                            width={150}
                            src={imageSrc}
                            preview={false}
                        />
                        <Typography.Title level={3}>{response}</Typography.Title>
                    </Space>

                </Col>
            </Row>
        </Form>
    </Space>)
}

export default VerifySignature;