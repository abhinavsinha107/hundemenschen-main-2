type ContentItem = {
  type: string;
  content?: string | ContentItem[] | undefined;
  text?: string;
};

type Section = {
  id: string;
  title: string;
  content: ContentItem[];
};

type SubPage = {
  title: string;
  sections: Section[];
};

type Page = {
  title: string;
  subPages: SubPage[];
};

type DataStructure = {
  pages: Page[];
};

type SearchResult = {
  pageIndex: number;
  pageTitle: string;
  subPageIndex: number;
  subPageTitle: string;
  sectionIndex: number;
  sectionTitle: string;
  contentType: string;
  contentText: string;
};

export function searchContent(
  data: DataStructure,
  term: string
): SearchResult[] {
  if (term.length < 1) return [];

  const results: SearchResult[] = [];
  const seenContent = new Set<string>();

  function recursiveSearch(pages: Page[], pageIndex: number = 0): void {
    pages?.forEach((page, pageIndex) => {
      page.subPages?.forEach((subPage, subPageIndex) => {
        subPage.sections?.forEach((section, sectionIndex) => {
          section.content?.forEach((contentItem) => {
            if (typeof contentItem === "object") {
              const textContent =
                contentItem.text ||
                (typeof contentItem.content === "string"
                  ? contentItem.content
                  : "");

              const lowerCaseContent = textContent.toLowerCase();
              if (
                lowerCaseContent.includes(term.toLowerCase()) &&
                !seenContent.has(lowerCaseContent)
              ) {
                seenContent.add(lowerCaseContent);
                results.push({
                  pageIndex,
                  pageTitle: page.title,
                  subPageIndex,
                  subPageTitle: subPage.title,
                  sectionIndex,
                  sectionTitle: section.title,
                  contentType: contentItem.type,
                  contentText: textContent,
                });
              }

              if (
                contentItem.type === "subTopic" &&
                Array.isArray(contentItem.content)
              ) {
                recursiveSearch(
                  [
                    {
                      title: subPage.title,
                      subPages: contentItem.content as any,
                    },
                  ],
                  pageIndex
                );
              }
            }
          });
        });
      });
    });
  }

  recursiveSearch(data.pages);

  return results;
}
