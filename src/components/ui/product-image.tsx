export default function ProductImage(props: { img: string, width: number, height: number }) {
  return (
    <img src={props.img} width={props.width} height={props.height} />
  )
}