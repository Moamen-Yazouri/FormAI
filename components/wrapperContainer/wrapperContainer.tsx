interface IProps {
    children: React.ReactNode;
}

const WrapperContainer = (props: IProps) => {
    return (
        <div className="w-full max-w-7xl px-1 mx-auto">
            {props.children}
        </div>
    )
}
export default WrapperContainer;