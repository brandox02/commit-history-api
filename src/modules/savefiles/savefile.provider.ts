import { ConfigOptions, v2 } from 'cloudinary';


export const SaveFileProvider = {
  provide: 'CLOUDINARY',
  useFactory: (): ConfigOptions =>
    v2.config({
      cloud_name: 'rosetechcode',
      api_key: '392457733736219',
      api_secret: 'yvap1rOKjjuzjTpkPGFzEr6azss',
      secure: true,
    }),
};
