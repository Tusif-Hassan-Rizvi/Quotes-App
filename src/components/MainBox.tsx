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

            console.log(data);

        } catch (error) {

        } finally {

        }
    }
    return (
        <div className='w-full p-5'>
            <div className="flex items-center justify-center w-full">
                <div className="p-10 bg-gray-200 w-full min-h-[250px] rounded-md flex items-center justify-center gap-3 flex-col">
                    <div className="w-full flex items-start justify-start flex-col">
                        <div className="font-bold mb-1 text-sm">Select Quotes Category</div>
                        <select className="py-2 px-3 border-green-300 border" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            console.log(e.target.value);
                            setSelectedCategories(e.target.value)
                        }}>
                            <option value="">Random</option>
                            {
                                QuotesCategories && QuotesCategories?.map((val: SelectCatogiesType, index: number) => <option key={val.id} value={val?.value}>{val?.categorie}</option>)
                            }
                        </select>

                    </div>
                    <button className="bg-green-600 text-white items-center justify-center font-semibold p-3 rounded-md hover:bg-green-500 transition-all ease-in-out duration-300 cursor-pointer active:bg-green-400" onClick={() => {
                        if (!isLoading) {
                            fetchQuotes();
                        } else {
                            return;
                        }
                    }} >Generate Quotes</button>

                    <div className="w-full text-center">
                        {
                            isLoading ? "Loading..." : <div>
                                {allQuotes ? <>
                                    <p>“{allQuotes?.quote}“</p>
                                    <div className="flex items-center justify-end text-xs font-bold">{allQuotes?.author
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