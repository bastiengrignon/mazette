/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from 'react'

import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import { FormInstance, Popconfirm, Tooltip, Typography, message } from 'antd'
import { IMusic, MovieService, MusicService, PartnerService, TrombinoscopeService } from '../../../../../services'

export enum ActionButtonType {
  MUSIC = 'music',
  MOVIE = 'movie',
  PARTNER = 'partner',
  TROMBINOSCOPE = 'trombinoscope',
}

interface ButtonGroupTableProps {
    editable: boolean
    record: any
    setEditingId: Dispatch<SetStateAction<number>>
    setObject: Dispatch<SetStateAction<any>>
    object: Record<any, any>
    form: FormInstance
    type: ActionButtonType
}

const ActionButtonsRow: React.FC<ButtonGroupTableProps> = ({ editable, record, setEditingId, setObject, object, form, type }) => {

    const cancelRow = () => setEditingId(0)

    const deleteRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading('Suppression en cours', 0)
        switch (type) {
        case ActionButtonType.MUSIC:
            await MusicService.delete(id).then(() => {
                hideLoadingMessage()
                message.success('Enregistrement supprimée')
            })
            break
        case ActionButtonType.MOVIE:
            await MovieService.delete(id).then(() => {
                hideLoadingMessage()
                message.success('Enregistrement supprimée')
            })
            break
        case ActionButtonType.PARTNER:
            await PartnerService.delete(id).then(() => {
                hideLoadingMessage()
                message.success('Enregistrement supprimée')
            })
            break
        case ActionButtonType.TROMBINOSCOPE:
            await TrombinoscopeService.delete(id).then(() => {
                hideLoadingMessage()
                message.success('Enregistrement supprimée')
            })
            break
        default:
            console.error('ActionButtonType not found')
            break
        }
        setObject(object)
    }

    const editRow = (record: Partial<IMusic>): void => {
        form.setFieldsValue({
            ...record
        })
        setEditingId(record.id || 0)
    }

    const saveRow = async (id: number): Promise<void> => {
        const hideLoadingMessage = message.loading('Modification en cours', 0)
        form.validateFields()
            .then(row => {
                switch (type) {
                case ActionButtonType.MUSIC:
                    MusicService.update(id, row)
                        .then(res => {
                            const index = object.findIndex(music => music.id === id)
                            setObject(object.splice(index, 1, {
                                ...object[index],
                                ...res
                            }))
                            message.success('Modification effectuée', 2.5)
                        })
                        .catch(err => message.error(`Erreur lors de la modification: ${ err }`, 2.5))
                        .finally(() => {
                            hideLoadingMessage()
                            form.resetFields()
                        })
                    break
                case ActionButtonType.MOVIE:
                    MovieService.update(id, row)
                        .then(res => {
                            const index = object.findIndex(movie => movie.id === id)
                            setObject(object.splice(index, 1, {
                                ...object[index],
                                ...res
                            }))
                            message.success('Modification effectuée', 2.5)
                        })
                        .catch(err => message.error(`Erreur lors de la modification: ${ err }`, 2.5))
                        .finally(() => {
                            hideLoadingMessage()
                            form.resetFields()
                        })
                    break
                case ActionButtonType.PARTNER:
                    PartnerService.update(id, row)
                        .then(res => {
                            const index = object.findIndex(movie => movie.id === id)
                            setObject(object.splice(index, 1, {
                                ...object[index],
                                ...res
                            }))
                            message.success('Modification effectuée', 2.5)
                        })
                        .catch(err => message.error(`Erreur lors de la modification: ${ err }`, 2.5))
                        .finally(() => {
                            hideLoadingMessage()
                            form.resetFields()
                        })
                    break
                case ActionButtonType.TROMBINOSCOPE:
                    TrombinoscopeService.update(id, row)
                        .then(res => {
                            const index = object.findIndex(movie => movie.id === id)
                            setObject(object.splice(index, 1, {
                                ...object[index],
                                ...res
                            }))
                            message.success('Modification effectuée', 2.5)
                        })
                        .catch(err => message.error(`Erreur lors de la modiifcation: ${ err }`, 2.5))
                        .finally(() => {
                            hideLoadingMessage()
                            form.resetFields()
                        })
                    break
                default:
                    console.error('ActionButtonType not found')
                    break
                }
            })
            .catch(err => console.log('Validate Failed: ', err))
            .finally(() => setEditingId(0))
    }

    return editable ?
        <span className="inline-flex justify-around w-full">
            <Tooltip title="Sauvegarder">
                <div className="text-blue-500 cursor-pointer" onClick={ () => saveRow(record.id) }>
                    <SaveOutlined/>
                </div>
            </Tooltip>
            <Typography.Link onClick={ cancelRow }>Annuler</Typography.Link>
        </span>
        :
        <span className="inline-flex justify-around w-full">
            <Typography.Link onClick={ () => editRow(record) }>
                <EditOutlined/>
            </Typography.Link>
            <Popconfirm placement="left" className="text-red cursor-pointer hover:text-gray-700"
                title="Veux-tu vraiment supprimer ?"
                onConfirm={ () => deleteRow(record.id) }>
                <DeleteOutlined/>
            </Popconfirm>
        </span>
}

export default ActionButtonsRow