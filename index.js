const calculatePowerSet = (set) => set.reduce((subsets, elem) => subsets.concat(subsets.map(subset => [...subset, elem])), [[]]);

const checkIsClosedUnderUnion = (sets) => {
    const setStrings = sets.map(set => [...set].sort().join(','));

    const setExists = union => setStrings.includes([...union].sort().join(','));

    for (let i = 0; i < sets.length; i++) {
        for (let j = i + 1; j < sets.length; j++) {
            if (!setExists(new Set([...sets[i], ...sets[j]]))) {
                return false;
            }
        }
    }

    return true;
}

const checkIsClosedUnderIntersection = (sets) => {
    const setStrings = new Set(sets.map(set => set.join(',')));
    const setExists = intersection => setStrings.has(intersection.join(','));

    for (let i = 0; i < sets.length; i++) {
        for (let j = i + 1; j < sets.length; j++) {
            if (!setExists(sets[i].filter(element => sets[j].includes(element)))) {
                return false;
            }
        }
    }

    return true;
}

const checkIsTopology = (sets, set) => {
    const containsEmptySet = sets.some(newSet => !newSet.length);
    const containsSet = sets.some(newSet => newSet.join(',') === set.join(','));

    return containsEmptySet && containsSet && checkIsClosedUnderUnion(sets) && checkIsClosedUnderIntersection(sets);
}

const setTopologies = (set) => {
    const pSet = calculatePowerSet(set);
    return calculatePowerSet(pSet).filter(topology => checkIsTopology(topology, set));
}

const result = [[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4]].map((A) => setTopologies(A).length);

console.log('result', result);