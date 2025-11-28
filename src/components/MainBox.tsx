"use client";

import React, { useEffect, useRef, useState } from "react";

interface SelectCatogiesType {
    id: number | string;
    categorie: string;
    value: string;

}

const QuotesCategories: SelectCatogiesType[] = [
    {
        id: 1,
        categorie: "Health",
        value: "health"
    }, {
        id: 2,
        categorie: "Success",
        value: "success"
    },
    {
        id: 3,
        categorie: "Wisdom",
        value: "wisdom"
    }, {
        id: 4,
        categorie: "Inspirational",
        value: "inspirational"
    }, {
        id: 5,
        categorie: "Philosophy",
        value: "philosophy"
    }, {
        id: 6,
        categorie: "Life",
        value: "life",
    }, {
        id: 7,
        categorie: "Truth",
        value: "truth"
    }, {
        id: 8,
        categorie: "Relationships",
        value: "relationships"
    }, {
        id: 9,
        categorie: "Love",
        value: "love",
    }, {
        id: 10,
        categorie: "Faith",
        value: "faith"
    }, {
        id: 11,
        categorie: "Humor",
        value: "humor",
    }, {
        id: 13,
        categorie: "Courage",
        value: "courage"
    }, {
        id: 14,
        categorie: "Art",
        value: "art"
    }, {
        id: 15,
        categorie: "writing",
        value: "writing"
    }, {
        id: 16,
        categorie: "Fear",
        value: "fear"
    }, {
        id: 17,
        categorie: "Time",
        value: "time"
    }, {
        id: 18,
        categorie: "Freedom",
        value: "freedom"
    }, {
        id: 19,
        categorie: "Death",
        value: "death"
    }, {
        id: 20,
        categorie: "Leadership",
        value: "leadership"
    }
]

export default function MainBox() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allQuotes, setAllQuotes] = useState<any>();
    const [selectedCategories, setSelectedCategories] = useState<string>("");
    const loadingRef = useRef<boolean>(true);


    const fetchQuotes = async () => {
        try {
            setIsLoading(true);
            const fetchdata = await fetch(
                // https://api.api-ninjas.com/v2/quotes?categories=success,wisdom
                `https://api.api-ninjas.com/v2/quotes${selectedCategories ? `?categories=${selectedCategories}` : ""}`,
                {
                    method: "GET",
                    headers: {
                        "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY || "",
                    },
                }
            );
            const data = await fetchdata.json();
            setIsLoading(false);
            setAllQuotes(data[0]);

        } catch (error) {

        } finally {

        }
    }
    return (
        <div className='w-full p-5'>
            <div className="flex items-center justify-center w-full">
                <div className="md:p-10 w-full min-h-[250px] rounded-md flex items-center justify-center gap-3 flex-col">

                    <div className="w-full flex flex-row gap-5 items-end justify-center">
                        <div className="flex items-start justify-start flex-col">
                            <div className="font-medium mb-2 ml-4 text-[11px]  text-[#666] uppercase tracking-wide">Category</div>
                            <select className="py-2 px-3 h-10 bg-[#f5f5f5] border-[1px solid #e0e0e0] text-[#333] text-[14px] rounded-[3px] cursor-pointer hover:bg-gray-200" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setSelectedCategories(e.target.value)
                            }}>
                                <option value="">Random</option>
                                {
                                    QuotesCategories && QuotesCategories?.map((val: SelectCatogiesType, index: number) => <option key={val.id} value={val?.value}>{val?.categorie}</option>)
                                }
                            </select>

                        </div>
                        <button className="bg-[#333] text-white items-center py-3 px-10 transition-all ease-in-out duration-300 cursor-pointer h-10 flex justify-center border-0 text-[13px] rounded-[3px] uppercase tracking-normal hover:bg-[#333333e1]" onClick={() => {
                            if (!isLoading) {
                                fetchQuotes();
                            } else {
                                return;
                            }
                        }} >Generate</button>
                    </div>



                    <div className="w-full text-center min-h-[100px] mt-6">
                        {
                            isLoading ? "Loading..." : <div className="flex items-center justify-center flex-col">
                                {allQuotes ? <>
                                    <div className="w-10 h-0.5 bg-[#333] mb-[25px]"></div>
                                    <p className="text-[20px] leading-8 text-[#333] font-light tracking-normal mb-[25px] max-w-[650px]">❝ {allQuotes?.quote} ❞</p>
                                    <div className="flex items-center justify-end text-[12px]  text-[#999] tracking-normal uppercase font-normal"><span className="font-semibold text-gray-600 pr-1">—</span> {allQuotes?.author
                                    }</div>
                                </> : null}
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}