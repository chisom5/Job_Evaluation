import update from "immutability-helper";
import CONFIG_CONSTANT from "./constant";

const initialState = {
  success: null,
  error: null,
  addingFactor: false,
  fetchingFactor: false,
  creatingDimension: false,
  creatingLevel: false,
  creatingMultiple: false,
  deletingLevel: false,
  deletingMultiple: false,
  deletingDimension: false,
  deletingFactor: false,
  factorList: [],
  factor_id: null,
  factorObj: null,
};

const requestingHome = (state, loading) =>
  update(state, {
    [loading]: {
      $set: true,
    },
  });
const handleFactorsFetched = (state, { payload }) =>
  update(state, {
    factorList: {
      $set: payload,
    },
    fetchingFactor: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully fetched" : null,
    },
  });
const deleteFactor = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );

  return update(state, {
    factorList: {
      $splice: [[ind, 1]],
    },

    deletingFactor: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully deleted" : null,
    },
  });
};

const handleFactorsUpdated = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  return update(state, {
    factorList: {
      [ind]: {
        label: {
          $set: payload.label,
        },
      },
    },

    updatingFactor: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully updated" : null,
    },
  });
};
const handleFactorsCreated = (state, { payload }) =>
  update(state, {
    factorList: {
      $push: [{ ...payload, dimensions: [], multipliers: [] }],
    },
    addingFactor: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully added" : null,
    },
  });

const addLevels = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  const dimInd = state.factorList[ind].dimensions.findIndex(
    (dim) => dim.id === payload.dimension_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        dimensions: {
          [dimInd]: {
            levels: {
              $push: [payload],
            },
          },
        },
      },
    },

    creatingLevel: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully added" : null,
    },
  });
};
const deleteLevels = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  const dimInd = state.factorList[ind].dimensions.findIndex(
    (dim) => dim.id === payload.dimension_id
  );
  const levelInd = state.factorList[ind].dimensions[dimInd].levels.findIndex(
    (level) => level.id === payload.level_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        dimensions: {
          [dimInd]: {
            levels: {
              $splice: [[levelInd, 1]],
            },
          },
        },
      },
    },

    creatingLevel: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully deleted" : null,
    },
  });
};

const addMultiples = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        multipliers: {
          $push: [payload],
        },
      },
    },

    creatingMultiple: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully added" : null,
    },
  });
};

const deleteMultipler = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  const multiInd = state.factorList[ind].multipliers.findIndex(
    (multiple) => multiple.id === payload.multiplier_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        multipliers: {
          $splice: [[multiInd, 1]],
        },
      },
    },

    deletingMultiple: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully deleted" : null,
    },
  });
};

const addDimension = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        dimensions: {
          $push: [payload],
        },
      },
    },
    creatingDimension: {
      $set: false,
    },
    success: {
      $set: payload ? "Dimension successfully added" : null,
    },
  });
};
const deleteDimension = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  const dimInd = state.factorList[ind].multipliers.findIndex(
    (dim) => dim.id === payload.dimension_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        dimensions: {
          $splice: [[dimInd, 1]],
        },
      },
    },

    deletingDimension: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully deleted" : null,
    },
  });
};
const updateDimension = (state, { payload }) => {
  const ind = state.factorList.findIndex(
    (item) => item.id === payload.factor_id
  );
  const dimInd = state.factorList[ind].dimensions.findIndex(
    (dim) => dim.id === payload.dimension_id
  );

  return update(state, {
    factorList: {
      [ind]: {
        dimensions: {
          [dimInd]: {
            label: {
              $set: payload.label,
            },
          },
        },
      },
    },

    updatingFactor: {
      $set: false,
    },
    success: {
      $set: payload ? "Successfully updated" : null,
    },
  });
};

const setErrorAction = (state, { payload }) =>
  update(state, {
    error: {
      $set: payload,
    },
  });

const setFactorObj = (state, { payload }) =>
  update(state, {
    factorObj: {
      $set: payload,
    },
  });
const setFactorId = (state, { payload }) =>
  update(state, {
    factor_id: {
      $set: payload,
    },
  });

const handleError = (state, { error }) => {
  return update(state, {
    addingFactor: {
      $set: false,
    },
    fetchingFactor: {
      $set: false,
    },
    creatingDimension: {
      $set: false,
    },
    creatingLevel: {
      $set: false,
    },
    creatingMultiple: {
      $set: false,
    },
    deletingLevel: {
      $set: false,
    },
    deletingMultiple: {
      $set: false,
    },
    deletingDimension: {
      $set: false,
    },
    deletingFactor: {
      $set: false,
    },
    updatingFactor: {
      $set: false,
    },
    updatingDimension: {
      $set: false,
    },
    error: {
      $set: error,
    },
  });
};

const clearError = (state) => {
  return update(state, {
    error: {
      $set: null,
    },
  });
};

const clearSuccessMessage = (state) =>
  update(state, {
    success: {
      $set: null,
    },
  });

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_CONSTANT.fetchFactorRequested:
      return requestingHome(state, "fetchingFactor");
    case CONFIG_CONSTANT.fetchFactorError:
      return handleError(state, action);
    case CONFIG_CONSTANT.fetchFactorSuccess:
      return handleFactorsFetched(state, action);

    case CONFIG_CONSTANT.createFactorRequested:
      return requestingHome(state, "addingFactor");
    case CONFIG_CONSTANT.createFactorError:
      return handleError(state, action);
    case CONFIG_CONSTANT.createFactorSuccess:
      return handleFactorsCreated(state, action);

    case CONFIG_CONSTANT.updateFactorRequested:
      return requestingHome(state, "updatingFactor");
    case CONFIG_CONSTANT.updateFactorError:
      return handleError(state, action);
    case CONFIG_CONSTANT.updateFactorSuccess:
      return handleFactorsUpdated(state, action);

    case CONFIG_CONSTANT.deleteFactorRequested:
      return requestingHome(state, "deletingFactor");
    case CONFIG_CONSTANT.deleteFactorError:
      return handleError(state, action);
    case CONFIG_CONSTANT.deleteFactorSuccess:
      return deleteFactor(state, action);

    case CONFIG_CONSTANT.createLevelRequested:
      return requestingHome(state, "creatingLevel");
    case CONFIG_CONSTANT.createLevelError:
      return handleError(state, action);
    case CONFIG_CONSTANT.createLevelSuccess:
      return addLevels(state, action);

    case CONFIG_CONSTANT.createMultipleRequested:
      return requestingHome(state, "creatingMultiple");
    case CONFIG_CONSTANT.createMultipleError:
      return handleError(state, action);
    case CONFIG_CONSTANT.createMultipleSuccess:
      return addMultiples(state, action);

    case CONFIG_CONSTANT.deleteLevelRequested:
      return requestingHome(state, "deletingLevel");
    case CONFIG_CONSTANT.deleteLevelError:
      return handleError(state, action);
    case CONFIG_CONSTANT.deleteLevelSuccess:
      return deleteLevels(state, action);

    case CONFIG_CONSTANT.deleteMultiplierRequested:
      return requestingHome(state, "deletingMultiple");
    case CONFIG_CONSTANT.deleteMultiplierError:
      return handleError(state, action);
    case CONFIG_CONSTANT.deleteMultiplierSuccess:
      return deleteMultipler(state, action);

    case CONFIG_CONSTANT.createDimensionsRequested:
      return requestingHome(state, "creatingDimension");
    case CONFIG_CONSTANT.createDimensionsError:
      return handleError(state, action);
    case CONFIG_CONSTANT.createDimensionsSuccess:
      return addDimension(state, action);

    case CONFIG_CONSTANT.deleteDimensionRequested:
      return requestingHome(state, "deletingDimension");
    case CONFIG_CONSTANT.deleteDimensionError:
      return handleError(state, action);
    case CONFIG_CONSTANT.deleteDimensionSuccess:
      return deleteDimension(state, action);

    case CONFIG_CONSTANT.updateDimensionRequested:
      return requestingHome(state, "updatingDimension");
    case CONFIG_CONSTANT.updateDimensionError:
      return handleError(state, action);
    case CONFIG_CONSTANT.updateDimensionSuccess:
      return updateDimension(state, action);

    case CONFIG_CONSTANT.setErrorSuccess:
      return setErrorAction(state, action);

    case CONFIG_CONSTANT.SET_FACTOR_ID:
      return setFactorId(state, action);

    case CONFIG_CONSTANT.SET_FACTOR_OBJ:
      return setFactorObj(state, action);

    case CONFIG_CONSTANT.clearErrorMessageSuccess:
      return clearError(state, action);
    case CONFIG_CONSTANT.clearSuccessMessageSuccess:
      return clearSuccessMessage(state, action);

    default:
      return state;
  }
};
export default configReducer;
