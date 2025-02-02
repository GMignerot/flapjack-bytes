import {germplasmSimilarityScore} from '../Similarity'


export default class SimilarityLineSort {
  constructor(referenceName, chromosomeIndices){
    this.referenceName = referenceName;
    this.chromosomeIndices = chromosomeIndices;
    this.scoreMap = undefined;
    this.hasScore = true;
  }

  sort(dataSet){
    const referenceIndex = dataSet.germplasmList.findIndex(germplasm => germplasm.name == this.referenceName);

    this.scoreMap = new Map();
    for (let comparedIndex in dataSet.germplasmList){
      this.scoreMap.set(
        dataSet.germplasmList[comparedIndex].name,
        germplasmSimilarityScore(dataSet, referenceIndex, comparedIndex, this.chromosomeIndices),
      );
    }

    dataSet.germplasmList.sort((a, b) => this.scoreMap.get(b.name) - this.scoreMap.get(a.name));
  }

  getScore(germplasmName){
    return this.scoreMap.get(germplasmName);
  }

  setComparisonLine(referenceName){
    this.referenceName = referenceName;
  }

  setChromosomes(chromosomeIndices){
    this.chromosomeIndices = chromosomeIndices
  }
}