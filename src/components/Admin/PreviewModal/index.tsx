import { Modal } from "antd"
import React from "react"
import { AdvancedImage } from "@cloudinary/react"
import { cloudinary } from "../../../index"

interface PreviewModalProps {
    open: boolean
    hide: () => void
    previewURL: string
}

const PreviewModal: React.FC<PreviewModalProps> = ({ open, hide, previewURL }) => (
    <Modal visible={ open } footer={ null } onCancel={ hide }>
        <AdvancedImage cldImg={ cloudinary.image(previewURL) }
            className="w-full h-auto my-5"/>
    </Modal>
)
export default PreviewModal