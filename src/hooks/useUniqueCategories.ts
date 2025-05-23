import { useEffect, useRef, useState } from "react";
import { Category } from "../types/Category";
import { Video } from "../types/Videos";

// Definição do tipo do hook personalizado
type UseUniqueCategoriesHook = (
  videoState: Video, // Estado atual do vídeo
  setVideoState: React.Dispatch<React.SetStateAction<Video>> // Função para atualizar o estado do vídeo
) => [
  uniqueCategories: Category[], // Retorna um array de categorias únicas
  setUniqueCategories: React.Dispatch<React.SetStateAction<Category[]>> // Setter para atualizar manualmente as categorias únicas
];

// Definição e exportação do hook personalizado
export const useUniqueCategories: UseUniqueCategoriesHook = (
  videoState,
  setVideoState
) => {
  // Estado local para armazenar as categorias únicas
  const [uniqueCategories, setUniqueCategories] = useState<Category[]>([]);

  // useRef para armazenar as categorias que devem ser mantidas no estado do vídeo
  const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);

  // Desestrutura os dados do estado do vídeo
  const { genres, categories } = videoState;

  // Função auxiliar para filtrar categorias únicas com base no ID
  const filterById = (
    category: Category | undefined,
    index: number,
    self: (Category | undefined)[]
  ): boolean => index === self.findIndex((c) => c?.id === category?.id);

  // useEffect que executa quando 'genres' muda
  useEffect(() => {
    const uniqueCategories = genres
      ?.flatMap(({ categories }) => categories) // Junta todos os arrays de categorias dentro de cada gênero
      .filter(filterById) as Category[]; // Filtra para manter apenas categorias únicas

    setUniqueCategories(uniqueCategories); // Atualiza o estado local com as categorias únicas
  }, [genres]); // Dependência: roda sempre que 'genres' mudar

  // useEffect que executa quando 'uniqueCategories' ou 'categories' mudam
  useEffect(() => {
    categoriesToKeepRef.current = categories?.filter((category) =>
      uniqueCategories.find((c) => c?.id === category.id) // Mantém apenas as categorias que estão em 'uniqueCategories'
    );
  }, [uniqueCategories, categories]); // Dependências: roda sempre que 'uniqueCategories' ou 'categories' mudarem

  // useEffect que sincroniza o estado do vídeo com as categorias filtradas
  useEffect(() => {
    setVideoState((state: Video) => ({
      ...state, // Mantém o restante do estado do vídeo
      categories: categoriesToKeepRef.current, // Atualiza apenas o campo 'categories'
    }));
  }, [uniqueCategories, setVideoState]); // Dependências: roda sempre que 'uniqueCategories' mudar

  // Retorna as categorias únicas e seu setter
  return [uniqueCategories, setUniqueCategories];
};