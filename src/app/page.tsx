import { Button } from "@/components/ui/button";
import { FiShoppingCart } from "react-icons/fi";


export default function Home() {
  return (
    <main>
      <h1 className="text-2xl">Projeto Dashboard</h1>
      <Button>Test</Button>
      <h3> Lets go for a <FiShoppingCart size={100} color={'#123456'} />? </h3>
    </main>
  );
}
