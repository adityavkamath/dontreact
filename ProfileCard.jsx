import React, { useState } from 'react'

const ProfileCard = ({ name, bio, profilepic }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`h-auto w-[650px] flex justify-center transition-colors duration-300 ${isHovered ? 'bg-indigo-600' : 'bg-gray-700'
                } group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='w-[250px] mt-8 '>
                <img
                    className='rounded-4xl transition-all duration-300 ease-in-out group-hover:scale-110'
                    src={profilepic}
                    alt="profile"
                />
                <div className='mt-7'>
                    <div className='text-4xl text-center mt-2 font-bold'>
                        {name}
                    </div>
                    <div className='text-3xl mb-3 text-center mt-2 font-bold'>
                        {bio}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard