declare module '*.module.scss' {
    interface ICLassNames {
        [className: string]: string
    }
    const classNames: ICLassNames;
    export = classNames;
}