type RemovePropertiesBasedOnClass<T, C> = {
   [K in keyof T as K extends keyof C ? never : K]: T[K];
};
