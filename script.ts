interface AppState {
    currentStyleIndex: number;
    styleDictionary: { [key: string]: string };
}

const state: AppState = {
    currentStyleIndex: 0, // Initial style index
    styleDictionary: {
        style1: 'style/style1.css',
        style2: 'style/style2.css',
        style3: '',
    },
};

function switchStyle(x: number): void {
    const styleLink = document.getElementById('style-link') as HTMLLinkElement;
    const newStyleIndex = x;
    const newStyle = `style${newStyleIndex + 1}`;
    const newStylePath = state.styleDictionary[newStyle];

    if (styleLink && newStylePath) {
        styleLink.href = newStylePath;
        state.currentStyleIndex = newStyleIndex;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const styleLink = document.getElementById('style-link') as HTMLLinkElement;
    const totalStyles = Object.keys(state.styleDictionary).length;
    const styleTable = document.getElementById('link-table');
    for(let i=0; i < totalStyles; i++){
        let listitem = document.createElement('li');
        listitem.className = "list-item";
        styleTable?.appendChild(listitem);
        let link = document.createElement('a');
        link.href = '#';
        link.innerHTML = "Styl " + i;
        listitem?.appendChild(link);

        if (styleLink && link) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                switchStyle(i);
            });
        }
    }

    switchStyle(0);

});
