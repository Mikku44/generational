import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Inventory } from "~/models/inventoryModel";
import { InventoryService } from "services/inventoryService";
import { mockInventory } from "~/constants/app";
import type { Route } from "./+types/inventoryDetail";
import { PhotoView } from "react-photo-view";


export function meta({ params }: Route.MetaArgs) {

    return [
        { title: `${mockInventory.title} - GENERATIONAL` },
        { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
    ];
}

export default function InventoryDetail() {
    const { id } = useParams();
    const [data, setData] = useState<Inventory | null>(
        mockInventory
    );

    useEffect(() => {
        if (!id) return;
        InventoryService.getById(id).then((res) => setData(res));
    }, [id]);



    return (
        <div className=" mx-auto mb-20 space-y-6">


            {/* Cover (video or image) */}
            <div className="h-[400px] overflow-clip">
                {data?.cover.type === "image" ? (
                    <img src={data.cover.href} className="w-full" />
                ) : (
                    <video controls className="w-full ">
                        <source src={data?.cover.href} />
                    </video>
                )}
            </div>

            <div className="container-x">
                {/* Title */}
                <h1 className="text-4xl mb-2 font-bold">{data?.title}</h1>
                <h1 className=" font-thin mb-5">{data?.subtitle}</h1>
                {/* Year + Price + Status */}
                <div className="flex items-center gap-4 mb-5 text-xl">
                    <div>Year: {data?.year}</div>
                    <div>Price: ${data?.price.toLocaleString()}</div>
                    <div className={`px-2 py-1 text-white text-xs ${data?.status === "available" ? "bg-black" : "bg-gray-500"
                        }`}>
                        {data?.status}
                    </div>
                </div>
                {/* Content */}
                <p className="text-lg leading-relaxed">{data?.content}</p>
                {/* Image gallery */}
                {data?.gallery && data?.gallery?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                        {data?.gallery?.map((img, i) => (
                            <PhotoView key={i} src={img} >
                                <img src={img} className="rounded-lg" />
                            </PhotoView>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
