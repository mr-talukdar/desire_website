export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100]" style={{ marginTop: 0, paddingTop: 0 }}>
      {children}
    </div>
  );
}
