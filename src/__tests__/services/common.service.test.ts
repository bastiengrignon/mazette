import { CommonService } from "../../services/admin/common/common.service"

describe("Common Service tests", () => {
    test("capitalize OK", () => {
        const lowercaseTest = "string"
        const capitalizeExpected = "String"
        expect(CommonService.capitalize(lowercaseTest)).toBe(capitalizeExpected)
    })

    test("capitalize NOK", () => {
        const lowercaseTest = "string"
        expect(CommonService.capitalize(lowercaseTest)).not.toBe(lowercaseTest)
    })

    test("mergedColumns not editable", () => {
        const columns = [{ editable: false }]
        const mergedColumns = CommonService.mergedColumns(columns, () => true)

        expect(mergedColumns).toStrictEqual(columns)
    })

    test("mergedColumns editable", () => {
        const columns = [{ editable: true, dataIndex: "title", onCell: (record: any) => ({ record }) }]
        const mergedColumns = CommonService.mergedColumns(columns, () => true)

        expect(JSON.stringify(mergedColumns)).toStrictEqual(JSON.stringify(columns))
    })

    test("mergedColumns videoLink not required", () => {
        const columns = [{ editable: true, dataIndex: "videoLink", onCell: (record: any) => ({ record }) }]
        const mergedColumns = CommonService.mergedColumns(columns, () => true)

        // @ts-ignore
        expect(mergedColumns[0].onCell().required).toBeFalsy()
        // @ts-ignore
        expect(mergedColumns[0].onCell().editing).toBeTruthy()
    })
})