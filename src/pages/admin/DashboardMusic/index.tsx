import React from "react"
import Navigation from "../Navigation"
import { List } from "antd"

const DashboardMusic:React.FC = () => {

    return (
        <Navigation>
            <p className="text-xl mb-2">Liste des artistes : </p>
            <List className="" bordered renderItem={(item: string) => (
                <List.Item>{ item }</List.Item>
            )}>
            </List>
        </Navigation>
    )
}
export default DashboardMusic