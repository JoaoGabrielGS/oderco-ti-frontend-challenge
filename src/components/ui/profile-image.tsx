import { Avatar, AvatarImage } from "./avatar";

export default function ProfileImage(props: { img: string }) {
  return (
    <Avatar>
      <AvatarImage src={props.img} alt="sjdoisj" width={200} height={200} />
    </Avatar>
  )
}