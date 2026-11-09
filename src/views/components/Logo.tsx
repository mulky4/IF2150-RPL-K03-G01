import Image from "next/image";

type LogoProps = {
  /** "lengkap" = ikon + tulisan, "ikon" = ikonnya saja. */
  bentuk?: "lengkap" | "ikon";
  /** Pakai putih kalau latarnya gelap. */
  warna?: "hijau" | "putih";
  className?: string;
};

export function Logo({
  bentuk = "lengkap",
  warna = "hijau",
  className,
}: LogoProps) {
  const lengkap = bentuk === "lengkap";
  return (
    <Image
      src={`/logo/logo-${bentuk}-${warna}.svg`}
      alt="RekanBumi"
      width={lengkap ? 89 : 32}
      height={32}
      className={className}
      priority
    />
  );
}
