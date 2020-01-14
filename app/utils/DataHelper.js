export const getGroupedChannels = (items) => {
    if (!items && items.length === 0) {
        return [];
    }

    let groups = {};

    for (let i in items) {
        let groupName = items[i].category;

        if (groups.hasOwnProperty(groupName) === false) {
            groups[groupName] = {
                title: groupName,
                data: []
            };
        }

        groups[groupName].data.push(items[i]);
    }

    let sections = [];

    for (let groupId in groups) {
        let group = groups[groupId];

        sections.push({
            title: group.title,
            data: group.data
        });
    }

    return sections;
};
