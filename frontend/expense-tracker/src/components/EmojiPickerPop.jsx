import React, { useState } from 'react'
import EmojiPicker from "emoji-picker-react"
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPop = ({icon, onSelect}) => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
        <div className="relative inline-block">
                <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    >
                    <div className="w-12 h-12 flex items-center justify-center text-2xl bg-green-50 text-primary rounded">
                        {icon ? (
                        <img src={icon} alt="Icon" className="w-12 h-12" />
                        ) : (
                        <LuImage />
                        )}
                    </div>
                    <p>{icon ? "Change Icon" : "Pick Icon"}</p>
                    </div>
                    {isOpen && (
                    <div className="absolute z-50 mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
                            onClick={() => setIsOpen(false)}
                        >
                            <LuX />
                        </button>
                        <EmojiPicker
                            onEmojiClick={(emojiData) => {
                            onSelect(emojiData.imageUrl || "");
                            setIsOpen(false);
                            }}
                            theme="light"
                        />
                    </div>
                </div>
                )}
            </div>
        </div>
  );
};

export default EmojiPickerPop