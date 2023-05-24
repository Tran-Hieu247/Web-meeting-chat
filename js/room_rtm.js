let handleMemberJoined = async (MemberId) =>{
    console.log('A new member has joined the room', MemberId)
    addMemberToDom(MemberId);
    let members = await channel.getMembers();
    memberCount(members);
    
}

let addMemberToDom =  async (MemberId) =>{

    let {name} = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
    let membersWrapper = document.getElementById('member__list')
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`
    membersWrapper.insertAdjacentHTML('beforeend', memberItem)
}


let memberCount = async (members) =>{
    let count = document.getElementById('members__count');
    count.innerText = members.length;
}

let handleMemberLeft = async (MemberId) =>{
    removeMemberFromDom(MemberId);

    let members = await channel.getMembers();
    memberCount(members);
}

let removeMemberFromDom = async(MemberId) =>{
    let membersWrapper = document.getElementById(`member__${MemberId}__wrapper`)
    membersWrapper.remove();
}

let leaveChanel = async () =>{
    await channel.leave();
    await rtmClient.logout();
}

let getMembers = async () => {
    let members = await channel.getMembers();
    memberCount(members);
    for (let i = 0; members.length > i; i++){
        addMemberToDom(members[i])
    }
    
}

// Thêm sự kiện beforeunload để đăng xuất khỏi kênh trước khi đóng trang
window.addEventListener('beforeunload', leaveChanel);

