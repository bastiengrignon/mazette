import { UploadFile } from 'antd/es/upload/interface';
import { message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/es/upload';

export class UploadService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public static dummyUploadRequest = (options): void => {
    if (!options.onSuccess) return;

    options.onSuccess({ status: 200 }, new XMLHttpRequest());
  };

  public static getBase64 = async (file: File): Promise<string | ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result);
          return;
        }

        reject('Cannot convert file to base64.');
      };
    });

  static handleChange = (info: UploadChangeParam<UploadFile<File>>): RcFile | undefined => {
    if (info.file.status === 'done') message.success(`${info.file.name} uploadé avec succès`);
    else if (info.file.status === 'error') message.error(`${info.file.name} ne s'est pas uploadé!`);
    return info.file.originFileObj;
  };
}
