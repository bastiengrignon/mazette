import { IMovie } from "../movie/movie.interface"
import { IMusic } from "../music/music.interface"
import { FormInstance } from "antd"
import React from "react"
import { MovieService } from "../movie/movie.service"
import { MusicService } from "../music/music.service"

type Media = IMovie | IMusic

export class EditableCellService {
    static formToEdit: FormInstance
    static objectToModify: Media[]
    static newObjectSetter: (object) => void

    static init = <Type extends Media>(form: FormInstance, object: Type[], newObjectSetter: (newObject: Type[]) => void): void => {
        EditableCellService.formToEdit = form
        EditableCellService.objectToModify = object
        EditableCellService.newObjectSetter = newObjectSetter
    }

    static isEditing = <Type extends { id?: number }>(record: Type, id: number): boolean => record.id === id

    static edit = <Type extends Media>(record: Partial<Type>, setId: (id: number) => void): void => {
        if (EditableCellService.isMovieType(record as Type)) {
            EditableCellService.formToEdit.setFieldsValue({
                title: "",
                author: "",
                description: "",
                date: "",
                publicationDate: "",
                location: "",
                duration: "",
                ...record
            })
        } else {
            EditableCellService.formToEdit.setFieldsValue({
                name: "",
                type: "",
                description: "",
                publicationDate: "",
                image: "",
                ...record
            })
        }
        setId(record.id || 0)
    }

    static save = async <Type extends Media>(
        e: React.MouseEvent<HTMLAnchorElement>,
        id: number,
        setId: (id: number) => void): Promise<void> => {
        e.preventDefault()
        try {
            const row = (await EditableCellService.formToEdit.validateFields()) as Type
            if (EditableCellService.isMovieType(row)) {
                MovieService.update(id, row).then(res => {
                    const index = EditableCellService.objectToModify.findIndex(movie => movie.id === id)
                    EditableCellService.newObjectSetter(EditableCellService.objectToModify.splice(index, 1, {
                        ...EditableCellService.objectToModify[index],
                        ...res
                    }))
                })
            } else {
                MusicService.update(id, row).then(res => {
                    const index = EditableCellService.objectToModify.findIndex(movie => movie.id === id)
                    EditableCellService.newObjectSetter(EditableCellService.objectToModify.splice(index, 1, {
                        ...EditableCellService.objectToModify[index],
                        ...res
                    }))
                })
            }
            setId(0)
        } catch (err) {
            console.log("Validate Failed: ", err)
        }
    }

    static cancel = (setId: (id: number) => void): void => setId(0)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static mergedColumns = <Type>(columns: any[], id: number): any[] => {
        return columns.map(col => {
            if (!col.editable) return col
            return {
                ...col,
                onCell: (record: Type) => ({
                    record,
                    inputType: "text",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: EditableCellService.isEditing<Type>(record, id), }),
            }
        })
    }

    private static isMovieType = (type: Media): type is IMovie => {
        return (type as IMovie).title !== undefined
    }
}