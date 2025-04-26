type TProps = Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "name"
> & {
    name: string,
    label?: string,
    options: IOptions[],
    defaultValue?: string,
}