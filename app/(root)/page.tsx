import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="container">
        <div className="py-20 flex flex-col gap-8 items-center">
          <h1 className="text-5xl sm:text-7xl font-semibold text-center">
            Create your own NFTs Collections with your own campaign.
          </h1>
          <p className="text-center max-w-4xl sm:text-xl">
            Buy, sell, and discover exclusive digital assets. DegenStarter is a
            decentralized platform for creating, selling, and trading NFTs.
            Create your own NFTs and launch your own campaign.
          </p>
        </div>
      </section>
    </>
  );
}
