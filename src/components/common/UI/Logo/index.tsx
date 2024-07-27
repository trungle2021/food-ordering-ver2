interface LogoProps {
  className?: string;
  width: number;
}

export const Logo = ({ className, width }: LogoProps) => {
  return <img className={className} src="/logo.png" width={`${100}%`} />;
};
