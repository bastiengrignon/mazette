export class UploadService {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static dummyUploadRequest = (options): void => {
        if (!options.onSuccess) return

        options.onSuccess({ status: 200 }, new XMLHttpRequest())
    }
}