"use client";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../common/loader/Loader";
import {
  API_DATA,
  DEFAULT_DROPDOWN_INDEX,
  QUESTION_LIMIT,
  IMAGE_PATHS,
} from "../constants";
import { STRINGS } from "../localization";
import {
  MOCK_AGE_GROUPS,
  MOCK_DIFFICULTY_LEVEL,
  MOCK_HEADER_OPTIONS,
  MOCK_POPULAR_TOPICS,
  MOCK_RESPONSE_STRUCTURE,
} from "../mockData";
import styles from "../page.module.css";
import {
  buttonStyle,
  disabledButtonStyle,
  headerCurrentBorderStyle,
  headerDefaultBorderStyle,
  optionBorderStyle,
  textareaStyle,
} from "../styles";
import { colors } from "../styles/colors";

/**
 * Name: QuizScreen
 * Desc: Function to Render the Quiz UI
 */
const QuizScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [questionData, setQuestionData] = useState<any[]>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestionState, setIsQuestionState] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<any[]>([]);
  const [currentDropdownIndex, setCurrentDropdownIndex] = useState<number>(
    DEFAULT_DROPDOWN_INDEX
  );

  /**
   * Name: renderHeaderOptions
   * Desc: Function to Render header UI
   * @returns JSX element
   */
  const renderHeaderOptions = () => {
    return MOCK_HEADER_OPTIONS.map((item, index) => {
      return (
        <div
          className={
            currentIndex >= index ? styles.tabs : styles.tabsUnselected
          }
          style={
            currentIndex >= index
              ? headerCurrentBorderStyle
              : headerDefaultBorderStyle
          }
          key={`header_${index}`}
        >
          <div className={styles.categoryType}>
            <p className={styles.categoryTitle}>{item}</p>
            {selectedData[index] !== "" &&
              selectedData[index] !== undefined && (
                <p className={styles.selectedTitle}>
                  {index === 0
                    ? `${selectedData[index]}s`
                    : `${selectedData[index]}`}
                </p>
              )}
          </div>
          {selectedData[index] !== "" &&
            selectedData[index] !== undefined &&
            currentIndex !== 3 && (
              <div className={styles.imageContainer}>
                <Image
                  src={IMAGE_PATHS.checkIcon}
                  alt={STRINGS.checkIcon}
                  width={18}
                  height={18}
                  priority
                />
              </div>
            )}
          {currentIndex === 3 && (
            <div
              className={styles.imageContainer}
              onClick={() => {
                if (currentDropdownIndex === index) {
                  setCurrentDropdownIndex(DEFAULT_DROPDOWN_INDEX);
                } else {
                  setCurrentDropdownIndex(index);
                }
              }}
            >
              <Image
                src={IMAGE_PATHS.dropdownIcon}
                alt={STRINGS.dropdownIcon}
                width={18}
                height={18}
                priority
              />
            </div>
          )}
        </div>
      );
    });
  };

  /**
   * Name: fetchQuizQuestions
   * Desc: Function to call the ai api to generate quiz
   * @param {string} age - selected age value
   * @param {string} level - selected level value
   * @param {string} topic - selected topic value
   */
  const fetchQuizQuestions = async (
    age: string,
    level: string,
    topic: string
  ) => {
    try {
      const data = [
        { role: "system", content: "Act as a backend for a quiz application." },
        {
          role: "user",
          content:
            "Generate " +
            QUESTION_LIMIT +
            " closed questions related to the " +
            topic +
            ", and four possible answers for each of them. Only one answer is correct for each question. Do not repeat the same question. The quiz should be for " +
            age +
            " years of user and difficulty level should be " +
            level +
            ". Return JSON and nothing else. Example structure for topic - 'Nobel Prize':" +
            JSON.stringify(MOCK_RESPONSE_STRUCTURE),
        },
      ];
      const req = {
        model: API_DATA.gptModel,
        messages: data,
        temperature: 0,
      };
      const response = await fetch(API_DATA.requestUrl, {
        method: API_DATA.method,
        body: JSON.stringify(req),
        headers: {
          "Content-Type": API_DATA.contentType,
          Authorization: API_DATA.authorization,
        },
      });
      const myJson = await response.json();
      setQuestionData(JSON.parse(myJson.choices[0].message.content).questions);
      setLoading(false);
    } catch (error) {
      console.log("fetchQuizQuestionsError:-", error);
      setLoading(false);
    }
  };

  /**
   * Name: renderContentView
   * Desc: Function to render the content UI
   * @returns JSX element
   */
  const renderContentView = () => {
    if (currentIndex === 0) {
      return (
        <React.Fragment>
          <p className={styles.questionHeading}>{STRINGS.chooseAgeGroup}</p>
          <div className={styles.optionDiv}>
            {MOCK_AGE_GROUPS.map((item, index) => {
              return (
                <div
                  className={styles.optionElement}
                  style={optionBorderStyle}
                  onClick={() => {
                    setCurrentIndex(1);
                    setSelectedData([...selectedData, item?.value]);
                  }}
                  key={`ageGroups_${index}`}
                >
                  <div className={styles.iconContainer}>
                    <Image
                      src={item?.image}
                      alt={STRINGS.optionIcon}
                      width={45}
                      height={45}
                      priority
                    />
                  </div>
                  <div className={styles.optionType}>
                    <p className={styles.optionTitle}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    } else if (currentIndex === 1) {
      return (
        <React.Fragment>
          <p className={styles.questionHeading}>
            {STRINGS.chooseDifficultyLevel}
          </p>
          <div className={styles.optionDiv}>
            {MOCK_DIFFICULTY_LEVEL.map((item, index) => {
              return (
                <div
                  className={styles.optionElement}
                  style={optionBorderStyle}
                  onClick={() => {
                    setCurrentIndex(2);
                    setSelectedData([...selectedData, item?.value]);
                  }}
                  key={`difficultyLevel_${index}`}
                >
                  <div className={styles.iconContainer}>
                    <Image
                      src={item?.image}
                      alt={STRINGS.optionIcon}
                      width={45}
                      height={45}
                      priority
                    />
                  </div>
                  <div className={styles.optionType}>
                    <p className={styles.optionTitle}>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    } else if (currentIndex === 2) {
      let isAnswered = text !== "" ? true : false;
      return (
        <React.Fragment>
          <p className={styles.questionHeading}>
            Enter the topic of your interest in which <br /> you'd like to take
            the quiz?
          </p>
          <div className={styles.optionDiv}>
            <textarea
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
              rows={6}
              cols={300}
              style={textareaStyle}
              placeholder={STRINGS.enterTopic}
            />
            <div className={styles.popularContainer}>
              <p className={styles.popularHeader}>{STRINGS.popularTopics}</p>
              {MOCK_POPULAR_TOPICS.map((element, index) => {
                return (
                  <p
                    key={`popular_${index}`}
                    className={styles.popularTitle}
                    onClick={() => {
                      setText(element?.value);
                    }}
                  >
                    {element?.value}
                  </p>
                );
              })}
              <button
                style={!isAnswered ? disabledButtonStyle : buttonStyle}
                onClick={() => {
                  setCurrentIndex(3);
                  setSelectedData([...selectedData, text]);
                  setIsQuestionState(true);
                  setLoading(true);
                  fetchQuizQuestions(selectedData[0], selectedData[1], text);
                }}
                disabled={!isAnswered}
              >
                <p className={styles.buttonText}>{STRINGS.next}</p>
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  /**
   * Name: defaultOptionView
   * Desc: Function to render the default option UI
   * @param {any} item - list item
   * @param {number} index - index of the option
   * @returns JSX element
   */
  const defaultOptionView = (item: any, index: number) => {
    return item?.answers.map((childItem: any, childIndex: number) => {
      return (
        <div
          className={styles.optionElement}
          style={optionBorderStyle}
          onClick={() => {
            setSubmittedAnswers([...submittedAnswers, childItem]);
          }}
          key={`question_${index}_${childIndex}`}
        >
          <div className={styles.iconContainer}>
            <Image
              src={IMAGE_PATHS.circleIcon}
              alt={STRINGS.circleIcon}
              width={25}
              height={25}
              priority
            />
          </div>
          <div className={styles.optionType}>
            <p className={styles.optionTitle}>{childItem?.answer}</p>
          </div>
        </div>
      );
    });
  };

  /**
   * Name: submittedOptionView
   * Desc: Function to render the answer submitter option UI
   * @param {any} item - list item
   * @param {number} index - index of the option
   * @param {any} id - submitted answer id
   * @param {any} correctID - correct answer value
   * @returns JSX element
   */
  const submittedOptionView = (
    item: any,
    index: number,
    id: any,
    correctID: any
  ) => {
    return item?.answers.map((childItem: any, childIndex: number) => {
      const borderStyle =
        childItem?.id === id && id === correctID
          ? `1px solid ${colors.citrusGreen}`
          : childItem?.id === id && id !== correctID
          ? `1px solid ${colors.red}`
          : childItem?.id !== id && childItem?.id === correctID
          ? `1px solid ${colors.citrusGreen}`
          : `1px solid ${colors.borderGrey}`;
      const bgColor =
        childItem?.id === id && id === correctID
          ? colors.backgroundLightGreen
          : childItem?.id === id && id !== correctID
          ? colors.backgroundRed
          : childItem?.id !== id && childItem?.id === correctID
          ? colors.backgroundLightGreen
          : colors.white;
      return (
        <div
          className={styles.answerOptionElement}
          style={{
            backgroundColor: bgColor,
            borderTop: borderStyle,
          }}
          key={`question_${index}_${childIndex}`}
        >
          {childItem?.id === id && id === correctID && (
            <div className={styles.iconContainer}>
              <Image
                src={IMAGE_PATHS.checkIcon}
                alt={STRINGS.checkIcon}
                width={25}
                height={25}
                priority
              />
            </div>
          )}
          {childItem?.id === id && id !== correctID && (
            <div className={styles.iconContainer}>
              <Image
                src={IMAGE_PATHS.errorIcon}
                alt={STRINGS.errorIcon}
                width={25}
                height={25}
                priority
              />
            </div>
          )}
          {childItem?.id !== id && childItem?.id === correctID && (
            <div className={styles.iconContainer}>
              <Image
                src={IMAGE_PATHS.checkIcon}
                alt={STRINGS.checkIcon}
                width={25}
                height={25}
                priority
              />
            </div>
          )}
          {childItem?.id !== id && childItem?.id !== correctID && (
            <div className={styles.iconContainer}>
              <Image
                src={IMAGE_PATHS.circleIcon}
                alt={STRINGS.circleIcon}
                width={25}
                height={25}
                priority
              />
            </div>
          )}
          <div className={styles.optionType}>
            <p className={styles.optionTitle}>{childItem?.answer}</p>
          </div>
          {((childItem?.id === id && id === correctID) ||
            (childItem?.id !== id && childItem?.id === correctID)) && (
            <div className={styles.optionStatus}>
              <p className={styles.correctText}>{STRINGS.correctAnswer}</p>
            </div>
          )}
        </div>
      );
    });
  };

  /**
   * Name: resetState
   * Desc: Function to reset the states
   */
  const resetState = () => {
    setCurrentDropdownIndex(DEFAULT_DROPDOWN_INDEX);
    setLoading(true);
    setQuestionData([]);
    setCurrentQuestion(0);
    setSubmittedAnswers([]);
    setIsQuestionState(false);
    setCurrentIndex(0);
    setSelectedData([]);
    setText("");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  /**
   * Name: renderQuestionView
   * Desc: Function to render the question view UI
   * @returns JSX element
   */
  const renderQuestionView = () => {
    return (
      <React.Fragment>
        {questionData.map((item, index) => {
          if (index === currentQuestion) {
            let isAnswered = false;
            if (submittedAnswers.length > 0) {
              isAnswered =
                submittedAnswers[index] && submittedAnswers[index].answer
                  ? true
                  : false;
            }
            return (
              <React.Fragment key={`question_${index}`}>
                <p className={styles.questionHeading}>{item?.question}</p>
                <div className={styles.optionDiv}>
                  {isAnswered
                    ? submittedOptionView(
                        item,
                        index,
                        submittedAnswers[index].id,
                        item?.correctAnswerId
                      )
                    : defaultOptionView(item, index)}
                  {questionData.length - 1 !== index ? (
                    <button
                      style={!isAnswered ? disabledButtonStyle : buttonStyle}
                      onClick={() => {
                        setCurrentQuestion(currentQuestion + 1);
                      }}
                      disabled={!isAnswered}
                    >
                      <p className={styles.buttonText}>{STRINGS.next}</p>
                    </button>
                  ) : (
                    <button
                      style={!isAnswered ? disabledButtonStyle : buttonStyle}
                      onClick={() => {
                        resetState();
                      }}
                      disabled={!isAnswered}
                    >
                      <p className={styles.buttonText}>{STRINGS.finish}</p>
                    </button>
                  )}
                </div>
              </React.Fragment>
            );
          }
        })}
      </React.Fragment>
    );
  };

  /**
   * Name: updateHeaderState
   * Desc: Function to update the header on dropdown change
   * @param {string} value - dropdown selected text
   */
  const updateHeaderState = (value: string) => {
    const updateData = JSON.parse(JSON.stringify(selectedData));
    updateData[currentDropdownIndex] = value;
    setSelectedData(updateData);
    setQuestionData([]);
    setCurrentQuestion(0);
    setSubmittedAnswers([]);
    setCurrentDropdownIndex(DEFAULT_DROPDOWN_INDEX);
    setIsQuestionState(true);
    setLoading(true);
    fetchQuizQuestions(updateData[0], updateData[1], updateData[2]);
  };

  /**
   * Name: renderDropdownList
   * Desc: Function to render the dropdown option list
   * @returns JSX element
   */
  const renderDropdownList = () => {
    let classStyle = styles.dropdownAge;
    let optionsList: any[] = [];
    if (currentDropdownIndex === 0) {
      optionsList = MOCK_AGE_GROUPS;
      classStyle = styles.dropdownAge;
    } else if (currentDropdownIndex === 1) {
      optionsList = MOCK_DIFFICULTY_LEVEL;
      classStyle = styles.dropdownLevel;
    } else if (currentDropdownIndex === 2) {
      optionsList = MOCK_POPULAR_TOPICS;
      classStyle = styles.dropdownTopic;
    }
    if (optionsList.length > 0) {
      return (
        <ul className={classStyle}>
          {optionsList.map((item, index) => {
            if (item?.value === selectedData[currentDropdownIndex]) {
              return (
                <li
                  key={`list_${index}`}
                  className={styles.dropdownDisabledItem}
                >
                  {item.value}
                </li>
              );
            }
            return (
              <li
                key={`list_${index}`}
                className={styles.dropdownItem}
                onClick={() => updateHeaderState(item.value)}
              >
                {item.value}
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.topBar}>{renderHeaderOptions()}</div>
        {renderDropdownList()}
      </div>
      {questionData && questionData.length > 0 && (
        <div className={styles.topSerial}>
          <p className={styles.serialText}>{`${STRINGS.question} ${
            currentQuestion + 1
          } / ${questionData.length}`}</p>
        </div>
      )}
      <div className={styles.bodyContainer}>
        <div>
          {loading ? (
            <Loader />
          ) : isQuestionState ? (
            renderQuestionView()
          ) : (
            renderContentView()
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
