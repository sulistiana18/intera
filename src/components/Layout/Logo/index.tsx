import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo/intera.svg"
        alt="logo"
        width={220}
        height={80}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;