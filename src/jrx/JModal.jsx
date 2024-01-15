import { Modal } from "antd";
import { po } from "./Util";

export default function JModal({onSave,children,...props}){
    po('JModal',props)
    return <Modal 
        cancelButtonProps={{className:'convex'}}
        okButtonProps={{className:'convex'}} 
        className={'jr-modal'} 
        onOk={onSave} 
        cancelText={'關閉'} 
        {...props}
    >
        {children}
    </Modal>
}