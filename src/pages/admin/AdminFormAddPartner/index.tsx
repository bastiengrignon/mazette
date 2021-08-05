import React from "react"
import { Button, Form, FormInstance, Input, Upload } from "antd"
import { UploadService } from "../../../services/admin/upload/upload.service"
import { UploadOutlined } from "@ant-design/icons"
import { UploadChangeParam } from "antd/es/upload"
import { UploadFile } from "antd/es/upload/interface"

interface AdminFormAddPartnerProps {
    form: FormInstance
    onUploadChange: (info: UploadChangeParam<UploadFile<File>>) => void
}

const AdminFormAddPartner: React.FC<AdminFormAddPartnerProps> = ({ form, onUploadChange }) => (
    <Form form={ form }>
        <Form.Item label="Nom" name="name"
            rules={ [{ required: true, message: "Entrez le nom de l'artiste" }] }>
            <Input/>
        </Form.Item>
        <Form.Item label="Image" name="image" rules={ [{ required: true, message: "Ajouter une image !" }] }>
            <Upload name="image" onChange={ onUploadChange } customRequest={ UploadService.dummyUploadRequest }>
                <Button icon={ <UploadOutlined/> }>Ajouter une image</Button>
            </Upload>
        </Form.Item>
    </Form>
)
export default AdminFormAddPartner