interface Props {
  children: any;
  title: string;
}
export default function Card({ children, title }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="my-0">{title}</h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
