import { api } from "@/trpc/server";

export default async function Explore() {
  const daos = await api.dao.list();

  return (
    <div>
      <h1>Explore</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {daos.map((dao) => (
          <a href={dao.href} className="" key={dao.href}>
            <div
              className="border-skin-border bg-skin-block-bg hover:border-skin-text mb-0 flex items-center justify-center border-y text-center text-base transition-all md:rounded-xl md:border"
              style={{ height: "266px" }}
            >
              <div className="break-words p-4 leading-5 sm:leading-6">
                <div className="relative mb-2 inline-block">
                  <div symbol-index="space" className="mb-1">
                    <img
                      className="bg-skin-border rounded-full object-cover"
                      alt="avatar"
                      style={{
                        width: "82px",
                        height: "82px",
                        minWidth: "82px",
                        display: "none",
                      }}
                    />
                    <img
                      src={dao.avatarSrc}
                      className="bg-skin-border rounded-full object-cover"
                      alt="avatar"
                      style={{
                        width: "82px",
                        height: "82px",
                        minWidth: "82px",
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 truncate">
                  <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                    {dao.name}
                  </h3>
                  <div className="cursor-help pt-[1px]">
                    <i
                      className="iconfont iconcheck text-[#ffb503]"
                      style={{ fontSize: "20px", lineHeight: "20px" }}
                    ></i>
                  </div>
                </div>
                <div className="text-skin-text mb-[12px]">
                  {dao.members} members
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
