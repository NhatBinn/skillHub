import { Container } from "../layout/container";

function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1">
      <Container>{children}</Container>
    </main>
  );
}

export default Main;
