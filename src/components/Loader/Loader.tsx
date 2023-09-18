import "./Loader.css"

type LoaderProps = {
  size: "small" | "normal";
};

export default function Loader({ size }: LoaderProps) {
  return <span className={`loader ${size}`}></span>;
}
