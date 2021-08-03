export class UploadService {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static dummyUploadRequest = (options): void => {
        if (!options.onSuccess) return

        options.onSuccess({ status: 200 }, new XMLHttpRequest())
    }

    public static getBase64 = async (file: File): Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result)
                    return
                }

                reject("Cannot convert file to base64.")
            }
        })
    }
}