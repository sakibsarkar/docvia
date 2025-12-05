import Connection from "@/components/googleConnection/Connection";

const page = () => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto space-y-8">
        <div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your integrations and connections</p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-foreground mb-4 text-lg font-semibold">Integrations</h2>
            <Connection />
          </section>
        </div>
      </div>
    </main>
  );
};

export default page;
