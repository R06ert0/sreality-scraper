type Props = {
    title?: string;
    img?: string;
}
export default function EstateCard({title, img}: Props) {
    return <div style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        rowGap: 24,
        padding: 24,
        backgroundColor: "var(--bg-white)",
        borderRadius: 8,
        boxShadow: "var(--card-box-shadow)",
        overflow: "hidden",
        zIndex: -2
    }}>
        <div style={{
            position: "absolute",
            width: 500,
            height: 220,
            transform: "rotate(-30deg) translateX(-100px) translateY(-120px)",
            top: 0,
            left: 0,
            backgroundColor: "var(--bg-dark-red)",
            zIndex: -1
        }}></div>
        <img style={{
            width: 300,
            height: 220,
            borderRadius: 8,
        }} src={img} alt={title}/>
        <h2 style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 300,
            margin: 0,
            fontSize: 20,
            fontWeight: 500
        }}>{title}</h2>
    </div>
};